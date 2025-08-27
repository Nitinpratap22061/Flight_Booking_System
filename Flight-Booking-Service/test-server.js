const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server is working' }));
});

server.listen(4000, '0.0.0.0', () => {
    console.log('Test server is running on http://localhost:4000');
});
