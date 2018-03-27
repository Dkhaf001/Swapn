import React, { Component } from 'react';
import Bio from './bio.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import path from 'path';
import { bindActionCreators } from 'redux';
import { addCurrentList } from '../../actions';
import ListingList from '../Feed/listingPostList.jsx';
// Profile view will need feed view in here too.
// two views one as a Buyer & Seller
// Seller View
// need a specail navigation bar to switch views from selling bartering watching following
// need check here to make sure current logged in user match profile
// Buyer View
// buyer just render sellers current unsold listings
// Profile will render profile --> bio will check if logged in matches current user
class Profile extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    const user_id = path.basename(window.location.href);
    const { data } = await axios.get(`http://localhost:3396/api/posts/${user_id}`);
    console.log('thisis data curret profie', data);
    this.props.addCurrentList(data);
  }

  render() {
    return (
      <div>
        <div>
          <Bio />
        </div>
        <div>
          <ListingList {...this.props} />
          <div />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_list: state.current_list,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
