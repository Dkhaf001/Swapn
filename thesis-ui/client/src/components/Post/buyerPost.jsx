import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// should render chat view if the buyer has an active offer with seller
class BuyerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      photos: []
    };
  }

  async componentWillMount() {
    let postId = this.props.post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/posts/${postId}`
    );
    // get photos
    this.setState({
      post: data
    });
  }

  render() {
    return <div>{this.state.post}</div>;
  }
}

function mapStateToProps(state) {
  return {
    post: state.current_post
  };
}

export default connect(mapStateToProps)(BuyerPost);
