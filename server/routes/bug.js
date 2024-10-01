const express = require('express');
const Bug = require('../models/Bug');
const router = express.Router();

// Get all bugs
router.get('/', async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific bug by ID
router.get('/:id', async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new bug
router.post('/', async (req, res) => {
  const bug = new Bug(req.body);
  try {
    const newBug = await bug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing bug
router.put('/:id', async (req, res) => {
  try {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBug) return res.status(404).json({ message: 'Bug not found' });
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bug
router.delete('/:id', async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
