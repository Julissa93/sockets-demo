import React from 'react'
import socket from './socket'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            text: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
        evt.preventDefault()
        const text = document.getElementById('txt').value
        console.log('****evt: ', text)
        socket.emit('new-text-from-client', text)
        this.setState({text: text})
    }

    componentDidMount() {
        socket.on("new-text-from-server", newText => {
            console.log('incoming text: ', newText)
            this.setState({text: newText})
        })
    }

    render() {
        return (
            <center>
                <h1>Collaborative Document</h1>
                <textarea id="txt" type="text" cols="40" rows="5" value={this.state.text} onChange={this.handleChange}/>
                {/*<ul id="messages">
                    {
                        this.state.messages.map((msg, index) => 
                            <li key={index}>{msg}</li>)
                    }
                </ul>
                <input id="msg" name="msg" />
                <button type="submit" onClick={this.handleClick}>SEND </button>*/}
            </center>
        )
    }
    
}

export default App