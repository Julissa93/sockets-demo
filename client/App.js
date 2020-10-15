import React from 'react'
import socket from './socket'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(evt) {
        evt.preventDefault()
        console.log('evt: ', document.getElementById('msg').value)
        socket.emit('new-msg-from-client', document.getElementById('msg').value)
    }

    componentDidMount() {
        socket.on("new-msg-from-server", msg => {
            console.log('msg: ', msg)
            this.setState({messages: [...this.state.messages, msg]})
        })
    }

    render() {
        return (
            <center>
                <h1>Chat App</h1>
                <ul id="messages">
                    {
                        this.state.messages.map((msg, index) => 
                            <li key={index}>{msg}</li>)
                    }
                </ul>
                <input id="msg" name="msg" />
                <button type="submit" onClick={this.handleClick}>SEND </button>
            </center>
        )
    }
    
}

export default App