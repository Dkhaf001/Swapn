import React, { Component } from 'react'
import io from "socket.io-client/dist/socket.io.js"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addSocket } from '../../actions/index'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
class StatusBar extends Component {
  state = {
    messages: [],
  }
  async componentDidMount() {
    try {
      const username = this.props.active_user.username || JSON.parse(window.localStorage.getItem('user')).username
      const socket = io.connect('http://localhost:4155')
      this.props.addSocket(socket)
      socket.emit('new user', username)
      socket.on('directMessage', data => {
        console.log('receive a direct message', data)
        this.setState({
          messages: [data].concat(this.state.messages)
        })
      })
    }catch(err) {
      console.log('err StatusBar component', err)
    }
  }
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
          <NotificationsIcon />
        </IconButton>
        </Badge>
        </div>
        :
        <div>
         <IconButton tooltip="Notifications">
          <NotificationsIcon onClick={()=> console.log('u clikced a button')}/>
        </IconButton>
        </div>
      }
      
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSocket
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)