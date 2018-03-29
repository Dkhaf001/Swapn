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
import { addMessages, addActiveUserToStore, addCurrentPost } from '../../actions';
import axios from 'axios';
class StatusBar extends Component {
  state = {
    messages: [],
    open: false,
    offers:'',
    responseMessages: 0,
    offersMessages: 0,
    notifications:0
  };
  async componentWillMount() {
    try {
      if(localStorage.getItem('token')) {
        console.log('find a token tryingto connect to socket server')
        await this.verifyToken();
        const username = this.props.active_user.username || 'null'
        const socket = io.connect('http://localhost:4155');
        this.props.addSocket(socket);
        socket.emit('new user', username);
        socket.on('directMessage', data => {
          console.log('receive a direct message',  this.state.notifications+1);
          this.setState({
            messages: [data].concat(this.state.messages),
            offersMessages: data.buyer_username === this.props.active_user.username ? this.state.offersMessages : this.state.offersMessages+1,
            responseMessages: data.buyer_username === this.props.active_user.username ? this.state.responseMessages+1 : this.state.responseMessages,
            notifications: this.state.notifications+1
          });
          this.props.addMessages(this.state.messages)

        });
        socket.on('notifications', result => {
          console.log('notifications', result)
          this.props.addMessages(result)
          this.setState({
            messages: result,
            notifications: result.length
          })
          for(var i = 0; i < result.length; i ++) {
            if(result[i].buyer_username === this.props.active_user.username) {
              this.setState({
                responseMessages: this.state.responseMessages + 1
              })
            }else{
              this.setState({
                offersMessages: this.state.offersMessages + 1
              })  
            }
          }
        })
      }
    } catch (err) {
      // console.log('err StatusBar component', err);
    }
  }
  async verifyToken() {
    try {
      const { data } = await axios.get('http://localhost:3396/api/auth/authenticate', {
        params: {
          username: localStorage.getItem('username'),
          token: localStorage.getItem('token'),
        },
      });
      if (data) {
        await this.props.addActiveUserToStore(data);
      }else{
        console.log('no data', data)
        this.props.history.push('/login')
      }
    } catch (err) {
      console.log('err verifuyToken', err);
    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  showUsers() {
    console.log('this.state', this.state)
  }
  showMessages() {
    console.log(this.props.messages)
  }
  async handleMessageClick(message) {
    try{
      let post_id = message.postId
      const { data } = await axios.get(`http://localhost:3396/api/posts/fetchSinglePost/${post_id}`)
      console.log('here!', data)
      console.log('message', message)
      this.props.addCurrentPost(data[0]);
      this.props.history.push({
        pathname: `post/${message.postTitle}`,
      })
    }catch(err) {
    }
  }
  gotoMyPosts() {
    this.setState({
      notifications: this.state.notifications - this.state.offersMessages,
      offersMessages: 0
    })
    this.props.history.push({
      pathname: `/profile/selling`,
      state: this.state.messages
    })
  }
  render() {
    return (
      <div>
      {this.props.active_user &&
      <div>
          {this.state.notifications > 0 ? (
            <div>
              <Badge
                badgeContent={this.state.notifications}
                secondary={true}
                badgeStyle={{ top: 12, right: 12 }}
              >
                <IconButton tooltip="Notifications">
                  <NotificationsIcon
                    className="svg_icons"
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
                      <MenuItem
                        key={1}
                        value="Solid"
                        primaryText={`You have ${this.state.messages.length} messages`}
                      />
                      {
                        <MenuItem
                        key={2}
                        value="Solid"
                        primaryText={`View Offers Messages `+ this.state.offersMessages}
                        onClick = {()=>this.gotoMyPosts()}
                      />
                      }
                    </Menu>
                  </Popover>
                </IconButton>
              </Badge>
            </div>
          ) : (
            <div>
                <div>
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon
                      className="svg_icons"
                      onClick={() => console.log('u clikced a button')}
                    />
                  </IconButton>
                </div>
            </div>
          )}  

      </div>}
      <button onClick={()=>this.showUsers()}>show online users</button>
      <button onClick={()=>this.showMessages()}>show messages</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    socket: state.socket,
    messages: state.messages
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSocket,
      addActiveUserToStore,
      addMessages,
      addCurrentPost
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
