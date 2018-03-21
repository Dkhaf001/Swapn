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
          <Link to="/profile/selling" className="linkbutton">
            Selling
          </Link>
          <Link to="/profile/bartering" className="linkbutton">
            Bartering
          </Link>
          <Link to="/profile/watchlist" className="linkbutton">
            Watchlist
          </Link>
          <Link to="/profile/following" className="linkbutton">
            Following
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileNavbar;
