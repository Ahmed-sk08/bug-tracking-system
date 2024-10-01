import React, { useState } from 'react';
import axios from 'axios';

const UpdateBugForm = () => {
  const [bugId, setBugId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update bug
      const response = await axios.put(`/api/bugs/${bugId}`, { title, description, status });
      console.log('Bug updated:', response.data);
      // Add logic to handle successful update (e.g., show success message, update UI)
    } catch (error) {
      console.error('Error updating bug:', error.response.data);
      // Add logic to handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={bugId} onChange={(e) => setBugId(e.target.value)} placeholder="Bug ID" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
      <button type="submit">Update Bug</button>
    </form>
  );
};

export default UpdateBugForm;
