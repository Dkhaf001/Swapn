import React, { Component } from 'react';
import Bio from './bio.jsx';
import Edit from './edit.jsx';
//Profile view will need feed view in here too.
// two views one as a Buyer & Seller
//Seller View
// need a specail navigation bar to switch views from selling bartering watching following
//need check here to make sure current logged in user match profile
//Buyer View
//buyer just render sellers current unsold listings
//Profile will render profile --> bio will check if logged in matches current user
class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        Hello from Profile
        <Edit />
        <Bio />
      </div>
    );
  }
}

export default Profile;
