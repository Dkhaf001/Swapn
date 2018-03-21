import React, { Component } from 'react';
import io from "socket.io-client/dist/socket.io.js";
//communicates with sockets
// this component goes in to the single post view
//needto check if current user matches posing listing user
//chats are rendered in the post component
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: []
    }
  }
  async componentDidMount() {
    try {
      this.socket = io.connect('http://localhost:4155')
      this.socket.on('chat', data=> {
    })

    } catch(err) {
      console.log('err connecting socket',err)
    }
  }
  handleSubmit() {
    this.socket.emit('chat', {user: 'shayne', message: this.state.text})
  }
  render() {
    return (
    <div>
      Hello from Chat
      <input type="text" onChange={(e)=>this.setState({text: e.target.value})}/>
      <input type="submit" onClick={()=>this.handleSubmit()}/>
      {/* {this.state.messages.map((message, key)=> {

      })} */}
    </div>
    )
  }
}

export default Chat;
