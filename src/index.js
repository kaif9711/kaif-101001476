const express = require('express');
const app = express();

// Use the port defined by Cloud Run, or default to 8080 for local development
const PORT = process.env.PORT || 8080;

app.use(express.json());
// This serves all files from the 'static' directory
app.use(express.static(__dirname + '/static'));

// This route sends a 200 OK for the health check.
app.get('/', (req, res) => {
    // Redirect to the static index.html page so the app loads
    res.redirect('/index.html');
});

// NEW: Add this route back so the "Loading..." message goes away.
// It sends sample data because there is no database.
app.get('/items', (req, res) => {
    const sampleItems = [
        { id: '1', name: 'Cloud Build is working!' },
        { id: '2', name: 'Cloud Run is deployed!' }
    ];
    res.status(200).json(sampleItems);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log('App is ready and running!');
});

// This function handles graceful shutdown.
const gracefulShutdown = () => {
    console.log('Shutting down gracefully.');
    process.exit();
};

// Listen for termination signals to shut down gracefully.
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // This signal is sent by nodemon
