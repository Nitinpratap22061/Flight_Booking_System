const express = require('express');

const { ServerConfig, Queue } = require('./config');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs');

const app = express();

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Add a basic health check endpoint
app.get('/', (req, res) => {
    console.log('Health check endpoint hit');
    res.json({ status: 'UP', message: 'Server is running' });
});

app.use('/api', apiRoutes);
app.use('/bookingService/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Handle 404
app.use((req, res) => {
    console.log('404 - Route not found:', req.url);
    res.status(404).json({ error: 'Not Found' });
});

const server = app.listen(ServerConfig.PORT, '0.0.0.0', async () => {
    console.log(`Server is listening on http://localhost:${ServerConfig.PORT}`);
    try {
        CRON();
        await Queue.connectQueue();
        console.log("Queue connected");
    } catch (error) {
        console.error('Startup error:', error);
    }
});

server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${ServerConfig.PORT} is already in use`);
    }
});
