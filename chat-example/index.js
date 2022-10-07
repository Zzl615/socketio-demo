/**
 * @Author: Noaghzil
 * @Date:   2022-10-06 22:09:59
 * @Last Modified by:   Noaghzil
 * @Last Modified time: 2022-10-07 09:21:26
 */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        console.log('chat message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});