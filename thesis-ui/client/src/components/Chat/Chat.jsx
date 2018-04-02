import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

const { SOCKET_SERVER_URL } = process.env;
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
    };
  }
  async componentDidMount() {
    try {
      this.socket = io.connect(`${SOCKET_SERVER_URL}`);
      this.socket.on('chat', (data) => {});
    } catch (err) {
      console.log('err connecting socket', err);
    }
  }
  handleSubmit() {
    this.socket.emit('chat', { user: 'shayne', message: this.state.text });
  }
  render() {
    return (
      <div>
        Hello from Chat
        <input type="text" onChange={e => this.setState({ text: e.target.value })} />
        <input type="submit" onClick={() => this.handleSubmit()} />
        {/* {this.state.messages.map((message, key)=> {

      })} */}
      </div>
    );
  }
}

export default Chat;
