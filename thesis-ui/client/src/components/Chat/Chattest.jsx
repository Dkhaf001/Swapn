import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import randomstring from 'randomstring';
import { addCurrentRoomId } from '../../actions';
import axios from 'axios';

class Chattest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      roomId: '',
    };
    const addMessage = (data) => {
      console.log('Username is', this.state.username);
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = (ev) => {
      ev.preventDefault();
      this.props.socket.emit('message', {
        from: this.props.active_user.username,
        to: this.props.buyer ? this.props.buyer : this.props.current_post.username,
        postId: this.props.current_post.id,
        roomId: this.props.roomId,
        message: this.state.message,
        postTitle: this.props.current_post.title,
        buyer_username: this.props.buyer_username || 'not a buyer',
      });
      this.setState({ message: '' });
    };
  }
  async componentWillMount() {
    try {
      this.props.socket.emit('updateDatabase', {
        to: this.props.active_user.username,
        roomId: this.props.roomId,
      });
      console.log('inside of chattest this is the props shou have socket and roomId', this.props);
      this.props.addCurrentRoomId(this.props.roomId);
      this.props.socket.emit('joinRoom', this.props.roomId);
      this.props.socket.on('room:message', (data) => {
        console.log('room:message event', data);
        this.setState({
          messages: this.state.messages.concat(data),
        });
      });
      this.props.socket.on('history', (data) => {
        console.log('history', data);
        this.setState({
          messages: data,
        });
      });
      // const room_id = this.props.roomId
      // const { data } = await axios.get(`http://localhost:3396/api/messages/${room_id}`)
    } catch (err) {
      console.log('err in chattest ', err);
    }
  }
  //* ***************************** Div id is needed ******************************//
  render() {
    return (
      <div className="container" id={this.props.roomId}>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Barter Chatt</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map((message, key) => (
                    <div key={key}>
                      {message.from}: {message.message}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                {/* <input type="text" placeholder="Username" value={this.state.username}
                                 onChange={ev => this.setState({username: ev.target.value})} className="form-control"/> */}
                <br />
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <br />
                <button onClick={e => this.sendMessage(e)} className="btn btn-primary form-control">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentRoomId,
    },
    dispatch,
  );
}
function mapStateToProps(state) {
  return {
    socket: state.socket,
    active_user: state.active_user,
    //   current_post: current_post,
    dataFromReduxStorage: state.dataReducers,
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chattest);
