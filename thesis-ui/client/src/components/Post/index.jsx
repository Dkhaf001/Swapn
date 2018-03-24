import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import SellerPost from '../Post/sellerPost.jsx';
import BuyerPost from '../Post/buyerPost';

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentWillMount() {
    // axios.get('http://localhost:3396/api/posts/login');
  }
  render() {
    if (localStorage.id) {
      if (localStorage.id === this.props.current_post.user_id) {
        return <SellerPost />;
      }
    }
    return <BuyerPost {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps)(Post);
