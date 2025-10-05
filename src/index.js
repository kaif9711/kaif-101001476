const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// Start the server immediately so Cloud Run becomes healthy
// Correct (flexible port)
const PORT = process.env.PORT || 3000; // Use Cloud Run's port, or 8080 for local dev
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// You can now try to connect to the database in the background
// and check the logs later to debug the connection.
db.init().then(() => {
  console.log('Database connection successful.');
}).catch((err) => {
  console.error('Database connection failed:', err);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
