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
          <Bio />
          <div>
            <ProfileNavbar />
            <Switch>
              {profileRoutes.map((route, key) => {
                if (route.redirect) {
                  return <Redirect from={route.path} to={route.to} key={key} />;
                }
                return <Route path={route.path} component={route.component} key={key} />;
              })}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default SellerProfile;
