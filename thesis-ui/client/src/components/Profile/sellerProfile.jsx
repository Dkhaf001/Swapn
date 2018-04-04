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
      <div>
        <div>
          <ProfileNavbar />
          <div>
            <Bio />
            <Switch>
              {profileRoutes.map((prop, key) => (
                <Route path={prop.path} component={prop.component} key={key} />
              ))}
              <Redirect from="/profile" to="/profile/selling" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerProfile;
