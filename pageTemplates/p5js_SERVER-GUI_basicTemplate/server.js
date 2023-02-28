const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected: ', socket.id);

    socket.emit('userConnected', socket.id);

    socket.on('guiChange', (data) => {
        socket.broadcast.emit('guiChange', data);
    })

    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);

        io.emit('disconnectUser', socket.id);
    })
})


// change 3000 to port
server.listen(3000, () => {
    console.log('listening on *:3000');
  });