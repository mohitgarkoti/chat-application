const { Server } = require('socket.io');

const users = new Map();

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on('join', (username) => {
      users.set(socket.id, username);
      socket.broadcast.emit('message', {
        user: 'System',
        text: `${username} has joined the chat`
      });

      socket.emit('message', {
        user: 'System',
        text: `Welcome ${username}!`
      });
    });

    socket.on('sendMessage', (data) => {
      const username = users.get(socket.id) || 'Unknown';
      io.emit('message', {
        user: username,
        text: data.message
      });
    });

    socket.on('disconnect', () => {
      const username = users.get(socket.id);
      if (username) {
        io.emit('message', {
          user: 'System',
          text: `${username} has left the chat`
        });
        users.delete(socket.id);
      }
    });
  });
}

module.exports = { setupSocket };
