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
import { addActiveUserToStore } from '../../actions';
import axios from 'axios';
import { addMessages } from '../../actions'
class StatusBar extends Component {
  state = {
    messages: [],
    open: false,
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
          console.log('receive a direct message', data);
          this.setState({
            messages: [data].concat(this.state.messages)
          });
          this.props.addMessages(this.state.messages)
        });
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
    this.props.socket.emit('showUsers')
  }
  showMessages() {
    console.log(this.props.messages)
  }
  render() {
    return (
      <div>
      {this.props.active_user &&
      <div>
          {this.state.messages.length > 0 ? (
            <div>
              <Badge
                badgeContent={this.state.messages.length}
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
                      <MenuItem     
                       containerElement={<Link to="/profile/selling" />}
                        key={2} value="ShortDash" primaryText="View Offers" />
                      <MenuItem
                        containerElement={<Link to="/profile/bartering" />}
                        key={3} value="ShortDot" primaryText="View Posts" />
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
      addMessages
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
