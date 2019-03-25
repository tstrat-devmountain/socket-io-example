import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
const io = socketIOClient('http://localhost:4000');

class App extends Component {

  constructor() {
    super();

    this.state = {
      messages: [],
      messageText: ''
    }

    io.on('news', payload => {
      console.log(payload);
    })
    io.on('new join', payload => {
      console.log('Someone Joined!', payload);
    })

    io.on('new message', message => this.setState({ messages : [...this.state.messages, message]}))
  }

  componentDidMount() {
    io.emit('join', 'testRoom')
  }

  render() {

    return (
      <div className="App">
        <input onChange={e=> this.setState({ messageText: e.target.value })} />
        <button onClick={() => io.emit('message', this.state.messageText)}>Send Message</button>
        { this.state.messages.map(message => <h1>{message}</h1>)}
      </div>
    );
  }
}

export default App;
