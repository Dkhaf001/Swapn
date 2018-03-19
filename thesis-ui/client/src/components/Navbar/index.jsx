import React, { Component } from 'react';
import Search from './Search.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Navbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="rowbanner">
        <div className="leftbanner">
          {this.props.user ? `Current User: ${this.props.user}` : ''}
        </div>
        <div className="middlebanner">
          <Search />
          <LocationSearch />
          <Link to="/auth" className="linkbutton">
            {' '}
            Login{' '}
          </Link>
          <Link to="/post" className="linkbutton">
            {' '}
            List{' '}
          </Link>
          <Link to="/messages" className="linkbutton">
            {' '}
            Messages{' '}
          </Link>
          {/* <LoginLogout onClick={this.props.onClick} authed={this.props.auth} user={this.props.user} type={this.props.type} /> */}
          {/* <Link to="/login" className="linkbutton"> Login </Link>
          <button className="linkbutton" name="logout" onClick={this.props.onClick}> Logout </button> */}
        </div>
      </div>
    );
  }
  //fill out functions to render what you want depending if user is logged in or not.
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
