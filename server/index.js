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

/* 
- To emit events we use socket.emit()
- To handle incoming events we use socket.on()
- To send message to everyone except the sender we use socket.broadcast.emit()
- To send message to everying INCLUDING sender we use io.emit() (NOTE: in class I made a mistake and said it was socket.emit - I meant io.emit()!!!)
*/

//set up on "connection" event handler and console.log the socket.id when someone connects to server
io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!')
    
    //set up event handler (socket.on) for when new message comes in from client - BUT our client socket is not set up yet. 
    //like we said earlier in lecture, socket io is a DUET of libraries made for the client and server side. 
    //So to complete the websocket connection w/ socket.io we must do create a socket object for both client and server! (client socket is in client/socket.js)
    socket.on('new-text-from-client', text => { 
        //console.log('text: ', text) to see what you get from client
        //What should we use to send message to everyone EXCEPT the sender? socket.broadcast
        //for everyone including the sender? io.emit()
        //https://socket.io/docs/emit-cheatsheet/
        socket.broadcast.emit('new-text-from-server', text)
    })
})
