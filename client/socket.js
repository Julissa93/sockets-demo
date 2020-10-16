import io from 'socket.io-client'

//create socket object on client side - connect to localhost
const socket = io(window.location.origin) //localhost:3000

export default socket
