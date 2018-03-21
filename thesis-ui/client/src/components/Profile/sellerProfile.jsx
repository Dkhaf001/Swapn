import React, { Component } from 'react';
import Bio from './bio.jsx'; // might not need
import ListingPostList from '../Feed/listingPostList.jsx';

class SellerProfile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Bio />
        <ListingPostList />
      </div>
    );
  }
}

export default SellerProfile;
