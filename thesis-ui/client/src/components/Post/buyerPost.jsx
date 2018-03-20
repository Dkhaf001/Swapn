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
    this.getPost();
    this.getPhotos();
  }

  async getPost() {
    let postId = this.props.post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/posts/${postId}`
    );
    this.setState({
      post: data
    });
  }

  async getPhotos() {
    let postId = this.props.post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/photos/${postId}`
    );
    this.setState({
      photos: data
    });
  }

  render() {
    return (
      <div>
        <p>Post info</p>
        {this.state.post}
        <p>Photos</p>
        {this.state.photos}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.current_post
  };
}

export default connect(mapStateToProps)(BuyerPost);
