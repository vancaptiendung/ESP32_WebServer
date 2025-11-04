const socket = io();

// Elements
const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const messagesDiv = document.getElementById('messages');

// Load chat history
socket.on('chatHistory', (history) => {
  history.forEach((msg) => appendMessage(msg.username, msg.message, msg.timestamp));
});

// New messages
socket.on('chatMessage', (data) => {
  appendMessage(data.username, data.message, data.timestamp);
});

// Send message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (username && message) {
    socket.emit('chatMessage', { username, message });
    messageInput.value = '';
  }
});

// Append to chat box
function appendMessage(username, message, timestamp) {
  const msgElement = document.createElement('p');
  const time = new Date(timestamp).toLocaleTimeString();
  msgElement.innerHTML = `<strong>${username}</strong> [${time}]: ${message}`;
  messagesDiv.appendChild(msgElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
