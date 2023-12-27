const http = require('http');
const app = require('./backend/app');

console.log("Server started")

// Setting port dynamically or static.
const port = process.env.PORT || 3000;

app.set('port', port);

// Creating app server.
const server = http.createServer(app);

// Listening port.
server.listen(port);