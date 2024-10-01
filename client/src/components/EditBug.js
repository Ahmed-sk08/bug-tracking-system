// src/components/EditBug.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditBug.css'; // Import the CSS file

function EditBug() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState({
    title: '',
    description: '',
    status: 'Open',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`/api/bugs/${id}`);
        setBug(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bug data:', error.response || error.message || error);
        setError('Error fetching bug data');
        setLoading(false);
      }
    };
    fetchBug();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBug((prevBug) => ({
      ...prevBug,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bug.title || !bug.description) {
      setError('Both fields are required');
      return;
    }
    try {
      await axios.put(`/api/bugs/${id}`, bug);
      navigate('/');
    } catch (error) {
      console.error('Error updating bug', error);
      setError('Error updating bug');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-bug-container">
      <h2 className="edit-bug-title">Edit Bug</h2>
      {error && <p className="error">{error}</p>}
      <form className="edit-bug-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={bug.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={bug.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={bug.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button type="submit">Update Bug</button>
      </form>
    </div>
  );
}

export default EditBug;
