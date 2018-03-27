import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCurrentPost, addCurrentList } from '../../actions';
import SellerPost from '../Post/sellerPost.jsx';
import BuyerPost from '../Post/buyerPost.jsx';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import path from 'path';

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentWillMount() {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      const { data } = await axios.get(`http://localhost:3396/api/posts/fetchSinglePost/${postId}`);
      console.log('successfully received post');
      console.log('~~~~~~~~', data[0]);
      // this.setState({
      //   post: data[0],
      // });
      this.props.addCurrentPost(data[0]);
      console.log('asdfasf', this.props.current_post);
    } catch (error) {}
  }

  render() {
    if (this.props.current_post) {
      if (localStorage.id) {
        if (Number(localStorage.id) === Number(this.props.current_post.user_id)) {
          return <SellerPost />;
        }
      }
      return <BuyerPost />;
    }
    return <div>Loading...</div>;
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
