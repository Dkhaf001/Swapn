import React, { Component } from 'react';
import Bio from './bio.jsx'; // might not need
import ListingPostList from '../Feed/listingPostList.jsx';
import ProfileNavbar from '../Navbar/profileNavbar.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';

class SellerProfile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Bio />
        <div>
          <ProfileNavbar />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              }
              return <Route path={prop.path} component={prop.component} key={key} />;
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default SellerProfile;
