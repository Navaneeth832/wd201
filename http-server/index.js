const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    serveFile('home.html', res);
  } else if (req.url === '/projects') {
    serveFile('project.html', res);
  } else if (req.url === '/registration') {
    serveFile('registration.html', res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

function serveFile(filename, res) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
