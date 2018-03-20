import React, { Component } from 'react';
//communicates with sockets
// this component goes in to the single post view
//needto check if current user matches posing listing user
//chats are rendered in the post component
class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Hello from Chat</div>;
  }
}

export default Chat;
