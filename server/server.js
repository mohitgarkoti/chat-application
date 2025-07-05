const http = require('http');
const app = require('./index');
const { setupSocket } = require('./socket/socketHandler');

const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
