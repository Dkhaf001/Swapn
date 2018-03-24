import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSocket } from '../../actions/index';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { addActiveUserToStore } from '../../actions'
import axios from 'axios'
class StatusBar extends Component {
  state = {
    messages: [],
    open: false
  }
  async componentWillMount() {
    try {
      await this.verifyToken();
      console.log('after verifyToken', this.props.active_user)
      const username = this.props.active_user.username || 'null'
      const socket = io.connect('http://localhost:4155');
      this.props.addSocket(socket);
      socket.emit('new user', username);
      socket.on('directMessage', data => {
        console.log('receive a direct message', data);
        this.setState({
          messages: [data].concat(this.state.messages)
        });
      });
    } catch (err) {
      // console.log('err StatusBar component', err);
    }
  }
  async verifyToken() {
    try{
      const { data } = await axios.get('http://localhost:3396/api/auth/authenticate', {
        params: {username:localStorage.getItem('username') , token: localStorage.getItem('token')}
      })
      if(data) {
        await this.props.addActiveUserToStore(data);
      }else{
        this.props.history.push('/login')
      }
    }catch(err) {
      console.log('err verifuyToken', err)
    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {
    return (
      <div>
      <div>
      {this.state.messages.length > 0 ? 
        <div>
        <Badge
        badgeContent={this.state.messages.length}
        secondary={true}
        badgeStyle={{top: 12, right: 12}}
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
        >Dash style</NotificationsIcon>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
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
            <MenuItem containerElement={<Link to="/profile/selling" />}
            key={1} value="Solid" primaryText={`You have ${this.state.messages.length} messages`}/>
            <MenuItem key={2} value="ShortDash" primaryText="View Offers"/> 
            <MenuItem key={3} value="ShortDot" primaryText="View Posts"/>
          </Menu>
        </Popover>
        </IconButton>
        </Badge>
        </div>
        :
        <div>
          {this.state.messages.length > 0 ? (
            <div>
              <Badge
                badgeContent={this.state.messages.length}
                secondary={true}
                badgeStyle={{ top: 12, right: 12 }}
              >
                <IconButton tooltip="Notifications">
                  <NotificationsIcon className="svg_icons"/>
                </IconButton>
              </Badge>
            </div>
          ) : (
            <div>
              <IconButton tooltip="Notifications">
                <NotificationsIcon className="svg_icons"
                  onClick={() => console.log('u clikced a button')}
                />
              </IconButton>
            </div>
          )}  
        </div>}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSocket,
      addActiveUserToStore
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);