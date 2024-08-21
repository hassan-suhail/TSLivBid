const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const auctionRoutes = require('./routes/auctionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auctions', auctionRoutes);
app.use('/api/users', userRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('placeBid', (data) => {
        io.emit('updateAuction', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = { app, server };
