console.log("Starting test server...");

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request received");
  res.end("Hello from Node");
});

server.listen(5000, () => {
  console.log("Test server is running on 5000");
}); 