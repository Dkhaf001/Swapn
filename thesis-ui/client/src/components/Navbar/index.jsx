import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor() {
    super();
  }

  logout = () => {
    window.localStorage.clear()
  }
  loggedInView = () => (
    <div>
      <Search />
      <Link to="/post" className="linkbutton">
        List
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
      <Link to="/post" className="linkbutton">
        List
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
    if (this.props.active_user) {
      return this.loggedInView();
    }
    return this.loggedOutView();
  }
  //  <LoginLogout onClick={this.props.onClick} authed={this.props.auth} user={this.props.user} type={this.props.type} />
  //         <Link to="/login" className="linkbutton"> Login </Link>
  //         <button className="linkbutton" name="logout" onClick={this.props.onClick}> Logout </button>
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
  };
}

export default connect(mapStateToProps)(Navbar);
