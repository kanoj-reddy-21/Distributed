// server.js

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Connect to Redis
const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

// Define MongoDB Schema and Model
const messageSchema = new mongoose.Schema({
    time: Date,
    user: String,
    room: String,
    data: String,
    type: String,
    broadcast: Boolean,
    unicast: Boolean,
    toUser: String
});

const Message = mongoose.model('Message', messageSchema);

// Middleware to cache messages in Redis
const cacheMiddleware = (req, res, next) => {
    const { room } = req.params;
    client.get(room, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

// Route to fetch messages
app.get('/messages/:room', cacheMiddleware, async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await Message.find({ room });
        // Cache messages in Redis for future requests
        client.setex(room, 3600, JSON.stringify(messages));
        res.send(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Other routes and middleware...

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
