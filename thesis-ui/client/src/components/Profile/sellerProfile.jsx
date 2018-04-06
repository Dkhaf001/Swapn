import React, { Component } from 'react';
import Bio from './bio.jsx'; // might not need
import ListingPostList from '../Feed/listingPostList.jsx';
import ProfileNavbar from '../Navbar/profileNavbar.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import { profileRoutes } from '../../routes/app.jsx';
import Chattest from '../Chat/Chattest.jsx';

class SellerProfile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="flex-container">
        <div
          style={{
            float: 'left',
            width: '15%',
            height: '20%',
            align: 'center',
            overflow: 'hidden'
          }}
        >
          <Bio />
        </div>
        <div style={{ float: 'right', width: '80%' }}>
          <ProfileNavbar />
          <Switch>
            {profileRoutes.map((prop, key) => (
              <Route path={prop.path} component={prop.component} key={key} />
            ))}
            <Redirect from="/profile" to="/profile/selling" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default SellerProfile;
