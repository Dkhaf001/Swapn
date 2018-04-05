import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSocket } from '../../actions/index';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import {
  addMessages,
  addActiveUserToStore,
  addCurrentPost,
  addAcceptedOffers,
} from '../../actions';
import axios from 'axios';

const { REST_SERVER_URL } = process.env;
const { SOCKET_SERVER_URL } = process.env;
class StatusBar extends Component {
  state = {
    messages: [],
    open: false,
    offers: '',
    Allmessages: [],
    arr: [],
    acceptedOffers: [],
    logedin: '',
  };
  async componentDidMount() {
    try {
      const user = await this.verifyToken();
      if (user) {
        this.setState({
          logedin: user,
        });
        const username = this.props.active_user.username;
        const socket = io.connect(`${SOCKET_SERVER_URL}`);

        // =======THIS IS THE BUG=======
        this.props.addSocket(socket);
        // =============================
        socket.emit('new user', username);
        socket.on('directMessage', (data) => {
          if (document.getElementById(data.roomId) && this.props.current_roomId === data.roomId) {
          } else {
            let temp = false;
            for (let i = 0; i < this.state.arr.length; i++) {
              if (this.state.arr[i][0] === data.roomId) {
                temp = true;
              }
            }
            if (!temp) {
              // console.log('u dont have this user unread in ur notification component going to do concat');
              const array = this.state.arr.slice();
              array.push([data.roomId, data]);
              console.log('arr', array);
              this.setState({
                arr: array,
              });
            } else {
              console.log('this user send you a  message u have not read  and he sned another one');
            }
          }
        });
        socket.on('notifications', (result) => {
          const obj = {};
          for (let i = 0; i < result.length; i++) {
            obj[result[i].roomId] = result[i];
          }
          const arr = Object.entries(obj);
          this.setState({
            arr,
            Allmessages: result,
          });
        });
        socket.on('offerAccepted', (data) => {
          // console.log('your offer has been accepted! please contact the seller');
          socket.emit('fetchAllAcceptedOffers', this.props.active_user.username);
        });
        socket.on('acceptedOffersdata', (data) => {
          // console.log('acceptedOffersdata', data);
          this.props.addAcceptedOffers(data);
          this.setState({
            acceptedOffers: data,
          });
        });
      } else {
        this.props.history.push('/login');
      }
    } catch (err) {
      console.log('error on componentWillMount - StatusBar');
    }
  }
  async verifyToken() {
    try {
      const { data } = await axios.get(`${REST_SERVER_URL}/api/auth/authenticate`, {
        params: {
          username: localStorage.getItem('username'),
          token: localStorage.getItem('token'),
        },
      });
      if (data) {
        await this.props.addActiveUserToStore(data);
        return data;
      }
      // console.log('no data', data);
      return null;
    } catch (err) {
      console.log('err verifyToken', err);
      return null;
    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  gotoMyPosts(message) {
    this.props.history.push({
      pathname: `/post/${message.postId}`,
      state: message,
    });
    location.reload();
  }
  gotoAcceptedOffer(offer) {
    // console.log('you are tryi9ng to see you accepted offer', this.props, offer);
    this.props.history.push(`/post/${offer.post_id}`);
    location.reload();
  }
  render() {
    return (
      <div>
        {this.state.logedin && (
          <div>
            {this.state.arr.length + this.state.acceptedOffers.length > 0 ? (
              <div>
                <Badge
                  badgeContent={this.state.arr.length + this.state.acceptedOffers.length}
                  secondary={true}
                  badgeStyle={{ top: 12, right: 12 }}
                >
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon
                      className="svg_icons"
                      color="white"
                      onClick={(event) => {
                        this.setState({
                          open: true,
                          anchorEl: event.currentTarget,
                        });
                      }}
                    >
                      Dash style
                    </NotificationsIcon>
                    <Popover
                      open={this.state.open}
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                      onRequestClose={this.handleRequestClose}
                      animation={PopoverAnimationVertical}
                    >
                      <Menu
                        value={this.state.dashStyle}
                        onClick={(event) => {
                          this.setState({
                            open: false,
                            anchorEl: event.currentTarget,
                          });
                        }}
                        // onChange={this.handleDashChange.bind(this)} something like this to render what you click below
                      >
                        {/* <MenuItem
                          key={1}
                          value="Solid"
                          primaryText={`${this.state.messagesCount} Messages Unread and ${
                            this.state.acceptedOffers
                          } Accepted Offers`}
                        /> */}
                        {/* {this.state.Allmessages.map(message => (
                          <MenuItem
                            key={message._id}
                            value="Solid"
                            primaryText={`${message.from} send you a message`}
                            onClick={() => this.gotoMyPosts()}
                          />
                        ))} */}
                        {this.state.acceptedOffers.map(accepted => (
                          <MenuItem
                            key={accepted.post_id}
                            value="Solid"
                            primaryText={`${accepted.seller} accepted your offer on ${
                              accepted.title
                            }!`}
                            onClick={() => this.gotoAcceptedOffer(accepted)}
                          />
                        ))}
                        {this.state.arr.map(message => (
                          <MenuItem
                            key={message[0]}
                            value="Solid"
                            primaryText={`${message[1].from} sent you a message for ${
                              message[1].postTitle
                            }`}
                            onClick={() => this.gotoMyPosts(message[1])}
                          />
                        ))}
                      </Menu>
                    </Popover>
                  </IconButton>
                </Badge>
              </div>
            ) : (
              <div>
                <IconButton tooltip="Notifications">
                  <NotificationsIcon
                    className="svg_icons"
                    color="white"
                    onClick={() => console.log('you clicked the notication button!')}
                  />
                </IconButton>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    socket: state.socket,
    messages: state.messages,
    current_roomId: state.current_roomId,
    changeRoomId: state.changeRoomId,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSocket,
      addActiveUserToStore,
      addMessages,
      addCurrentPost,
      addAcceptedOffers,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
