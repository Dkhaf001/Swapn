import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCurrentFollowing, addCurrentWatching } from '../../actions';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

// should render chat view if the buyer has an active offer with seller
class BuyerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      photos: [],
      currentlyFollowing: ''
    };
  }

  componentDidMount() {
    this.getPost();
    this.getPhotos();

    const userId = this.props.current_post.user_id;
    const followerId = this.props.active_user.id;
    const { rows } = axios.get(
      `http://localhost:3396/api/followings/${followerId}/${userId}`
    );
    console.log('ELBERT!!!data.rows!!!!!!', rows);
    if (rows) {
      this.setState({
        currentlyFollowing: true
      });
    } else {
      this.setState({
        currentlyFollowing: false
      });
    }
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
    if (
      this.props.active_user &&
      this.props.active_user.id !== this.props.current_post.user_id
    ) {
      const userId = this.props.active_user.id;
      const postId = this.props.current_post.id;
      await axios.post(
        `http://localhost:3396/api/watchers/${userId}/${postId}`
      );
      console.log('successfully added to watch list');
    } else if (!this.props.active_user) {
      console.log('you must be logged in to add to watch list');
    } else if (this.props.active_user.id === this.props.current_post.user_id) {
      console.log('you cant watch your own post');
    }
  }

  async toggleFollowList() {
    if (this.state.currentlyFollowing === true) {
      const userId = this.props.current_post.user_id;
      const followerId = this.props.active_user.id;
      await axios.delete(
        `http://localhost:3396/api/followings/${followerId}/${userId}`
      );
      this.setState({
        currentlyFollowing: false
      });
      console.log('you are no longer following this user!');
    } else {
      const userId = this.props.current_post.user_id;
      const followerId = this.props.active_user.id;
      await axios.post(
        `http://localhost:3396/api/followings/${followerId}/${userId}`
      );
      this.setState({
        currentlyFollowing: true
      });
      console.log('you now following this user');
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
        {this.state.currentlyFollowing === true ? (
          <RaisedButton
            label="Unfollow"
            primary={true}
            style={{ margin: 12 }}
            onClick={() => this.toggleFollowList()}
          />
        ) : (
          <RaisedButton
            label="Follow"
            primary={true}
            style={{ margin: 12 }}
            onClick={() => this.toggleFollowList()}
          />
        )}
        <RaisedButton
          label="Add to Watch List"
          style={{ margin: 12 }}
          onClick={() => this.addToWatchList()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
    active_user: state.active_user,
    current_following: state.current_following,
    current_watching: state.current_watching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentFollowing,
      addCurrentWatching
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerPost);
