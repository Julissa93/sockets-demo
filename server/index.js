const path = require('path')
const express = require('express')
const app = express()
const server = app.listen(3000, () => {
    console.log('Listening on *:3000')
})
//create socket object and connect it to our express server
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

//DEMO
//1. npm i socket.io
//2. set up on "connection" function and console.log when someone connects to server
//3. set up event handler for when new message comes in from client
//4. but client socket is not set up - like we said earlier in lecture, socket io is a DUET of libraries made for the client and server side
// to complete the connection set up we must do this for the client AND the server
//5. go to client/socket.js and add io code 
//6. now in order to emit events we use socket.emit 
//7. in order to handle incoming events we use socket.on
//8. and since we are using sockets, both client and server can emit or listen to events
// 9. Now that we have our socket connection between client and server, now we can start emitting and handling events


io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!')

    socket.on('new-text-from-client', text => { 
        //console.log('text: ', text) to see what you get from client
        //What should we use to send message to everyone EXCEPT the sender? socket.broadcast
        //for everyone including the sender? io.emit()
        //https://socket.io/docs/emit-cheatsheet/
        socket.broadcast.emit('new-text-from-server', text)
    })
})