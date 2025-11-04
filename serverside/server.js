// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Setup app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database('./chat.db', (err) => {
  if (err) console.error('DB connection error:', err.message);
  else console.log('Connected to SQLite database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Send chat history
  db.all('SELECT * FROM messages ORDER BY timestamp ASC', [], (err, rows) => {
    if (!err) socket.emit('chatHistory', rows);
  });

  // Listen for new messages
  socket.on('chatMessage', (data) => {
    const { username, message } = data;

    // Save to DB
    db.run('INSERT INTO messages (username, message) VALUES (?, ?)', [username, message]);

    // Broadcast to all
    io.emit('chatMessage', { username, message, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
