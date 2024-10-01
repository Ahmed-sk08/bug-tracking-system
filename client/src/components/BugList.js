import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../context/SocketContext'; 
import './BugList.css';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    axios.get('http://localhost:5000/api/bugs')
      .then(response => {
        console.log(response.data); 
        setBugs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bugs:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;

    console.log('Setting up socket listeners...');
    
    socket.on('bugCreated', (newBug) => {
      console.log('New bug created:', newBug);
      setBugs((prevBugs) => [...prevBugs, newBug]);
    });

    socket.on('bugUpdated', (updatedBug) => {
      console.log('Bug updated:', updatedBug);
      setBugs((prevBugs) =>
        prevBugs.map((bug) => (bug._id === updatedBug._id ? updatedBug : bug))
      );
    });

    socket.on('bugDeleted', (deletedBugId) => {
      console.log('Bug deleted:', deletedBugId);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== deletedBugId));
    });

    return () => {
      console.log('Removing socket listeners...');
      socket.off('bugCreated');
      socket.off('bugUpdated');
      socket.off('bugDeleted');
    };
  }, [socket]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/bugs/${id}`)
      .then(() => {
        setBugs(bugs.filter(bug => bug._id !== id));
      })
      .catch(error => console.error('Error deleting bug:', error));
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bug List</h1>
      <ul className="list-group">
        {bugs.map(bug => {
          const createdAt = new Date(bug.created_at);
          const updatedAt = new Date(bug.updated_at);

          // Check if the date is valid
          const formattedCreatedAt = isNaN(createdAt.getTime()) ? 'Invalid Date' : createdAt.toLocaleString();
          const formattedUpdatedAt = isNaN(updatedAt.getTime()) ? 'Invalid Date' : updatedAt.toLocaleString();

          return (
            <li key={bug._id} className="list-group-item">
              <h2>{bug.title}</h2>
              <p>{bug.description}</p>
              <p>Status: {bug.status}</p>
              <p>Created At: {formattedCreatedAt}</p>
              <p>Updated At: {formattedUpdatedAt}</p>
              <button
                className="btn btn-primary m-2"
                onClick={() => navigate(`/bug/${bug._id}`)}
              >
                View
              </button>
              <button
                className="btn btn-secondary m-2"
                onClick={() => navigate(`/edit/${bug._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleDelete(bug._id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BugList;
