const server = require('./api/server');

// Check environment  variables for port. If not found, resort to port 5000
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})