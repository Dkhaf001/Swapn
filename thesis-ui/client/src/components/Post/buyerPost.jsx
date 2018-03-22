import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// should render chat view if the buyer has an active offer with seller
class BuyerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      photos: [],
    };
  }

  async componentWillMount() {
    this.getPost();
    this.getPhotos();
  }

  async getPost() {
    console.log(this.props.current_post);
    const userId = this.props.current_post.user_id;
    const postId = this.props.current_post.id;
    const { data } = await axios.get(`http://localhost:3396/api/posts/${userId}/${postId}`);
    console.log('successfully received post');
    this.setState({
      post: data.rows,
    });
  }

  async getPhotos() {
    const postId = this.props.current_post.id;
    const { data } = await axios.get(`http://localhost:3396/api/photos/${postId}`);
    console.log('successfully received photos');
    this.setState({
      photos: data.rows,
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
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps)(BuyerPost);
