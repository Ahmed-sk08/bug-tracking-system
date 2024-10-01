import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner, Container, Alert } from 'react-bootstrap';
import './BugDetail.css';  // Import the CSS file

const BugDetail = () => {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/bugs/${id}`)
      .then(response => {
        console.log(response.data);
        setBug(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bug:', error);
        setError('Error fetching bug details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Date validation and formatting
  const createdAt = new Date(bug.created_at);
  const updatedAt = new Date(bug.updated_at);

  const formattedCreatedAt = isNaN(createdAt.getTime()) ? 'Invalid Date' : createdAt.toLocaleString();
  const formattedUpdatedAt = isNaN(updatedAt.getTime()) ? 'Invalid Date' : updatedAt.toLocaleString();

  if (isNaN(createdAt.getTime())) {
    console.error('Invalid Created Date:', bug.created_at);
  }

  if (isNaN(updatedAt.getTime())) {
    console.error('Invalid Updated Date:', bug.updated_at);
  }

  return (
    <Container className="bug-detail-container mt-5">
      <h2 className="bug-detail-title">{bug.title}</h2>
      <p className="bug-detail-description">{bug.description}</p>
      <p className="bug-detail-status">Status: <span>{bug.status}</span></p>
      <p className="bug-detail-dates">Created At: <span>{formattedCreatedAt}</span></p>
      <p className="bug-detail-dates">Updated At: <span>{formattedUpdatedAt}</span></p>
    </Container>
  );
};

export default BugDetail;
