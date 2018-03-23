import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUserToStore, addCurrentPost } from '../../actions';
<<<<<<< HEAD
import StatusBar from './StatusBar.jsx';
=======
import StatusBar from './StatusBar.jsx'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

>>>>>>> rebase

class Navbar extends Component {
  constructor() {
    super();
  }
  componentWillMount() {}
  clearStorePost = () => {
    this.props.addCurrentPost('');
  };
  logout = () => {
    localStorage.clear();
    this.props.addActiveUserToStore('');
    this.props.addCurrentPost('');
  };
  loggedInView = () => (
    <div>
      <StatusBar />
      <Search />
      <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
      <Link to="/home" className="linkbutton">
        Home
      </Link>
      <Link to="/post" className="linkbutton">
        Listing
      </Link>
      <Link to="/profile" className="linkbutton">
        Profile
      </Link>
      <Link to="/" onClick={this.logout} className="linkbutton">
        Logout
      </Link>
    </div>
  );
  // need to add logout functinoality and protection
  loggedOutView = () => (
    <div>
      <Search />
      <div>
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
      <Link to="/home" className="linkbutton">
        Home
      </Link>
      <Link to="/signup" className="linkbutton">
        SignUp
      </Link>
      <Link to="/login" className="linkbutton">
        Login
      </Link>
    </div>
  );
  render() {
    if (localStorage.token) {
      // localStorage need to change all logic to check local storage
      return this.loggedInView();
    }
    return this.loggedOutView();
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUserToStore,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);







