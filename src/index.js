let app = require('express')();
let http = require('http').createServer(app);
const port = 3000;
let io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname +'/index.html');
});

io.on('connection', (socket) => {
    io.emit('noOfConnections', Object.keys(io.sockets.connected).length)


    socket.on('disconnect', () => {
        console.log('disconnected')
        io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
    })



    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg)
    })
    socket.on('joined', (name) => {
        socket.broadcast.emit('joined', name)
    })
    socket.on('leaved', (name) => {
        socket.broadcast.emit('leaved', name)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('stoptyping', () => {
        socket.broadcast.emit('stoptyping')
    })


})

http.listen(port, () => console.log('Connected'))