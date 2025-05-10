const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, data) => {
  if (err) throw err;
  homeContent = data;
});

fs.readFile("project.html", (err, data) => {
  if (err) throw err;
  projectContent = data;
});

fs.readFile("registration.html", (err, data) => {
  if (err) throw err;
  registrationContent = data;
});
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  switch (req.url) {
    case "/project":
      res.write(projectContent);
      break;
    case "/registration":
      res.write(registrationContent);
      break;
    default:
      res.write(homeContent);
      break;
  }
  res.end();
}).listen(args.port || 3000);
