import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div>{this.props.user ? `Current User: ${this.props.user}` : ''}</div>
        <div>
          <Search />
          <Link to="/login" className="linkbutton">
            Login
          </Link>
          <Link to="/post" className="linkbutton">
            List
          </Link>
          <Link to="/selling" className="linkbutton">
            Selling
          </Link>
          <Link to="/profile" className="linkbutton">
            Profile
          </Link>
          <Link to="/signup" className="linkbutton">
            SignUp
          </Link>

          {/* <LoginLogout onClick={this.props.onClick} authed={this.props.auth} user={this.props.user} type={this.props.type} /> */}
          {/* <Link to="/login" className="linkbutton"> Login </Link>
          <button className="linkbutton" name="logout" onClick={this.props.onClick}> Logout </button> */}
        </div>
      </div>
    );
  }
  // fill out functions to render what you want depending if user is logged in or not.
  // loggedInView = () => {};
  // loggedOutView = () => {};

  // render () {
  //   return (
  //     if (current user from store is logged in render ) {
  //       loggedInView()
  //     } else {
  //       loggedOutView()
  //     }
  //   )
  // }
}

export default Navbar;
