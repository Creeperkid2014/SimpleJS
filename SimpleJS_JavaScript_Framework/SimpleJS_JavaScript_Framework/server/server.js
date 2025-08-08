// /SimpleJS/server/server.js
const http = require('http');
const WebSocket = require('ws');
const port = 1000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("SimpleJS WebSocket server");
});

// Create WebSocket server on top of HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log("Client connected");

  ws.send("Hello from the server!");

  ws.on('message', message => {
    console.log("Message from client:", message.toString());
    ws.send(`You said: ${message}`);
  });

  ws.on('close', () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`beep, boop. Server running at https://localhost:${port}/`);
});
