import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';

class ProfileNavbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {/* <div>{this.props.user ? `Current User: ${this.props.user}` : ''}</div> */}
        <div>
          <Link to="/selling" className="linkbutton">
            Selling
          </Link>
          <Link to="/bartering" className="linkbutton">
            Bartering
          </Link>
          <Link to="/watchlist" className="linkbutton">
            Watchlist
          </Link>
          <Link to="/following" className="linkbutton">
            Following
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileNavbar;
