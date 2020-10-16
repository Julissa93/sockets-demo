import React from 'react'

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
        console.log('evt: ', text)
        this.setState({text})
    }

    componentDidMount() {

    }

    render() {
        return (
            <center>
                <h1>Collaborative Document</h1>
                <textarea id="txt" type="text" cols="40" rows="5" value={this.state.text} onChange={this.handleChange}/>
            </center>
        )
    }
    
}

export default App