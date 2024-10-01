const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://Ahmed-sk08:bugtrackingdb@bug-tracking.lwq4j4s.mongodb.net/?retryWrites=true&w=majority&appName=bug-tracking', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use Routes
const bugs = require('./routes/bug');
const stats = require('./routes/stats');
const report = require('./routes/report'); // Add report route
app.use('/api/bugs', bugs);
app.use('/api/stats', stats);
app.use('/api/report', report); // Use the report route

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Integrate Socket.io with bug routes
const emitEvent = (event, data) => {
  io.emit(event, data);
};

// Modify bug routes to emit events (example for adding a new bug)
const Bug = require('./models/Bug'); // Ensure Bug model is imported

app.post('/api/bugs', async (req, res) => {
  const newBug = new Bug(req.body);
  await newBug.save();
  
  emitEvent('bugAdded', newBug);
  res.json(newBug);
});

app.put('/api/bugs/:id', async (req, res) => {
  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
  emitEvent('bugUpdated', updatedBug);
  res.json(updatedBug);
});

app.delete('/api/bugs/:id', async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  
  emitEvent('bugDeleted', req.params.id);
  res.json({ message: 'Bug deleted' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
