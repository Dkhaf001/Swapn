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
      modal: true,
    };

    this.sendMessage = (e) => {
      e.preventDefault();
      if (typeof e.type !== 'string' || (e.type == 'keyup' && e.keyCode != 13)) {
        return;
      }
      this.props.socket.emit('message', {
        from: this.props.active_user.username,
        to: this.props.buyer ? this.props.buyer : this.props.current_post.username,
        postId: this.props.current_post.id,
        roomId: this.props.roomId,
        message: e.target.value,
        postTitle: this.props.current_post.title,
        buyer_username: this.props.buyer_username || 'not a buyer',
        img: this.props.active_user.photo_url,
        date: new Date().toUTCString(),
      });
      this.setState({ message: '' });
      e.target.value = '';
    };
  }
  async componentDidMount() {
    try {
      this.props.socket.emit('updateDatabase', {
        to: this.props.active_user.username,
        roomId: this.props.roomId,
      });
      this.props.addCurrentRoomId(this.props.roomId);
      this.props.socket.emit('joinRoom', this.props.roomId);
      this.props.socket.on('room:message', (data) => {
        this.setState({
          messages: this.state.messages.concat(data),
        });
      });
      this.props.socket.on('history', (data) => {
        this.setState({
          messages: data,
        });
      });
      // this.setState({
      //   modal: this.props.modal,
      // });
      // const room_id = this.props.roomId
      // const { data } = await axios.get(`http://localhost:3396/api/messages/${room_id}`)
    } catch (err) {
      console.log('err in chattest ', err);
    }
  }
  changeClass = () => {
    const element = document.getElementById('modal-id');
    console.log('trying to add class to element', element);
    element.classList.add('modal-active');
  };
  async componentWillReceiveProps(nextProps) {
    console.log('componentwillreceiveprops', nextProps);
    //   console.log('chat receivinggggg', this.props.roomId);
    //   try {
    //     this.props.socket.emit('updateDatabase', {
    //       to: this.props.active_user.username,
    //       roomId: this.props.roomId,
    //     });
    //     console.log('inside of chattest this is the props shou have socket and roomId', this.props);
    //     this.props.addCurrentRoomId(this.props.currentRoom);
    //     this.props.socket.emit('joinRoom', this.props.currentRoom);
    //     this.props.socket.on('room:message', (data) => {
    //       console.log('room:message event', data);
    //       this.setState({
    //         messages: this.state.messages.concat(data),
    //       });
    //     });
    //     this.props.socket.on('history', (data) => {
    //       console.log('history', data);
    //       this.setState({
    //         messages: data,
    //       });
    //     });
    //     // const room_id = this.props.roomId
    //     // const { data } = await axios.get(`http://localhost:3396/api/messages/${room_id}`)
    //   } catch (err) {
    //     console.log('err in chattest ', err);
    //   }
  }
  //* ***************************** Div id is needed ******************************//
  render() {
    return (
      <div className="chatthing">
        <div className={this.state.modal ? 'modal-active' : 'modal'} id="modal-id">
          <a href="#close" className="modal-overlay" aria-label="Close" />
          <div className="modal-container">
            <div className="modal-header">
              <a
                className="btn btn-clear float-right"
                onClick={() => this.setState(state => ({ modal: !state.modal }))}
              />
              <div className="modal-title h5">Chat</div>
            </div>
            <div className="modal-body">
              <div className="content">
                <div className="chatBox" id={this.props.roomId}>
                  <div className="chat">
                    {this.state.messages.map((message, key) => (
                      <div
                        key={key}
                        className={
                          message.from === this.props.active_user.username
                            ? 'chatcontainer darker'
                            : 'chatcontainer'
                        }
                      >
                        <img
                          src={
                            message.from === this.props.active_user.username
                              ? this.props.active_user.photo_url
                              : message.img
                          }
                          alt="Avatar"
                          style={{ width: '100%' }}
                          className={
                            message.from === this.props.active_user.username ? 'right' : ''
                          }
                        />
                        <p>{message.message}</p>
                        <span
                          className={
                            message.from === this.props.active_user.username
                              ? 'time-left'
                              : 'time-right'
                          }
                        >
                          {message.date}
                        </span>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Message"
                    id="fname"
                    name="fname"
                    className="form-control"
                    onKeyUp={ev => this.sendMessage(ev)}
                  />
                </div>
              </div>
            </div>
            {/* <div class="modal-footer">...</div> */}
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
