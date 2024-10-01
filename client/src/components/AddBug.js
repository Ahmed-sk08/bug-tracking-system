// src/components/AddBug.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddBug = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Both fields are required');
      return;
    }

    axios.post('/api/bugs', { title, description, status })
      .then(response => {
        setTitle('');
        setDescription('');
        setStatus('Open');
        setError('');
        alert('Bug added successfully');
        navigate('/'); // Redirect to bug list
      })
      .catch(error => {
        console.error('Error adding bug:', error);
        setError('Error adding bug');
      });
  };

  return (
    <Container className="mt-5">
      <h2>Add Bug</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBugTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bug title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBugDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe the bug"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBugStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Add Bug
        </Button>
      </Form>
    </Container>
  );
};

export default AddBug;
