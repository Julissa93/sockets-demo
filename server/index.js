const path = require('path')
const express = require('express')
const app = express()
const server = app.listen(3000, () => {
    console.log('Listening on *:3000')
})
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

//demo
//1. npm i socket.io
//2. set up on "connection" function and console.log when someone connects to server
//3. 
io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!')

    socket.on('new-text-from-client', text => { 
        //console.log('message: ', text) 
        //show io.broadcast.emit first to show it only sends to everyone else except the sender
        //but we don't want io.broadcast we want it to show up for the sender as well! 
        socket.broadcast.emit('new-text-from-server', text)
    })
})