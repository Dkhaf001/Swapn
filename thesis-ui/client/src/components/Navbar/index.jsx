import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUserToStore, addCurrentPost } from '../../actions';
import StatusBar from './StatusBar.jsx'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


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







