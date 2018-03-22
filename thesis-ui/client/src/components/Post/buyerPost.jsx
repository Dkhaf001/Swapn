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
    const userId = this.props.current_post.user_id;
    const postId = this.props.current_post.id;
    const { rows } = await axios.get(
      `http://localhost:3396/api/posts/${userId}/${postId}`
    );
    console.log('successfully received post');
    this.setState({
      post: rows
    });
  }

  async getPhotos() {
    const postId = this.props.current_post.id;
    const { data } = await axios.get(
      `http://localhost:3396/api/photos/${postId}`
    );
    console.log('successfully received photos');
    this.setState({
      photos: data.rows
    });
  }

  async addToWatchList() {
    if (this.props.active_user) {
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      const { rows } = await axios.post(
        `http://localhost:3396/api/watchers/${userId}/${postId}`
      );
      console.log('successfully added to watch list');
    } else {
      console.log('you must be logged in to add to watch list');
    }
  }

  async addToFollowList() {
    if (this.props.active_user) {
      const userId = this.props.current_post.user_id;
      const followerId = this.props.active_user.id;
      await axios.post(
        `http://localhost:3396/api/followings/${userId}/${followerId}`
      );
      console.log('you clicked add to follow!');
    } else {
      console.log('you must be logged in to follow');
    }
  }

  render() {
    return (
      <div>
        <div>
          <img src={this.props.current_post.main_photo} />
        </div>
        <div>
          <h1>
            <strong>{this.props.current_post.title}</strong>
          </h1>
          <h3>{this.props.current_post.description}</h3>
          <h3>{this.props.current_post.condition}</h3>
          <h3>{this.props.current_post.location}</h3>
          <h4>
            <strong>{this.props.current_post.username}</strong> wants to trade
            this item for: {this.props.current_post.demand}
          </h4>
          <h4>Status: {this.props.current_post.status}</h4>
        </div>
        <button onClick={() => this.addToFollowList()}>
          hi this is a follow button
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
    active_user: state.active_user
  };
}

export default connect(mapStateToProps)(BuyerPost);
