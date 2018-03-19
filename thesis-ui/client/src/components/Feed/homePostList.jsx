import React, { Component } from 'react';
import Post from './post.jsx';
import { connect } from 'react-redux';
import axios from 'axios';
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class HomePostList extends Component {
  constructor() {
    super();
  }

  async componentWillMount () {
    //grab data from db, update store
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts')
      
    } catch() {

    }
  };

  render() {
    return (
      <div>Postlist</div>
    );
  }
}
function mapStateToProps(state) {
  return {
    postList: state.postList,
    activeUser: state.active_User
  }
}

export default connect(mapStateToProps)(HomePostList);

