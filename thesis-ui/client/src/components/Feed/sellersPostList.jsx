import React, { Component } from 'react';
import { connect } from 'react-redux'
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class SellersPostList extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      //what current user has sold/bidded, and can make new 
      <div>SellersPostlist</div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activeUser: state.active_User,
    current_list: state.current_list
  }
}

export default connect(mapStateToProps)(SellersPostList);

