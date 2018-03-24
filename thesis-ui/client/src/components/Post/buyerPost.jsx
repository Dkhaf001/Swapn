import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Chattest from '../Chat/Chattest.jsx'
class BuyerPost extends Component {
  constructor() {
    super();
    this.state = {
      post: '',
      photos: [],
      currentlyFollowing: '',
      currentlyWatching: '',
      isLoggedIn: false,
<<<<<<< HEAD
=======
      bartering: false
>>>>>>> fixed status bar and tryng to work on chat right now
    };
  }

  async componentWillMount() {
    this.getPost();
    this.getPhotos();
    this.getFollowing();
    this.getWatching();
    console.log('buyerPost component', this.props)
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  async getPost() {
    const userId = this.props.current_post.user_id;
    const postId = this.props.current_post.id;
    const { rows } = await axios.get(`http://localhost:3396/api/posts/${userId}/${postId}`);
    console.log('successfully received post');
    this.setState({
      post: rows,
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

  async getFollowing() {
    try {
      const userId = this.props.current_post.user_id;
      const followerId = localStorage.id;
      const { data } = await axios.get(`http://localhost:3396/api/followings/${followerId}/${userId}`);
      console.log('successfully received following list');
      if (data.rowCount > 0) {
        this.setState({
          currentlyFollowing: true,
        });
      } else {
        this.setState({
          currentlyFollowing: false,
        });
      }
    } catch (err) {
      console.log('error getting followers!');
    }
  }

  async getWatching() {
    try {
      const userId = localStorage.id;
      const postId = this.props.current_post.id;
      const { data } = await axios.get(`http://localhost:3396/api/watchers/${userId}/${postId}`);
      console.log('successfully received watch list');
      if (data.rowCount > 0) {
        this.setState({
          currentlyWatching: true,
        });
      } else {
        this.setState({
          currentlyWatching: false,
        });
      }
    } catch (err) {
      console.log('error getting watch list!');
    }
  }

  async toggleWatchList() {
    const userId = localStorage.id;
    const postId = this.props.current_post.id;
    if (localStorage.id) {
      if (this.state.currentlyWatching === true) {
        await axios.delete(`http://localhost:3396/api/watchers/${userId}/${postId}`);
        this.setState({
          currentlyWatching: false,
        });
        console.log('you are no longer watching this post');
      } else {
        await axios.post(`http://localhost:3396/api/watchers/${userId}/${postId}`);
        this.setState({
          currentlyWatching: true,
        });
        console.log('you are now watching this post');
      }
    } else {
      this.props.history.push('/login');
    }
  }

  async toggleFollowList() {
    const userId = this.props.current_post.user_id;
    const followerId = localStorage.id;
    if (localStorage.id) {
      if (this.state.currentlyFollowing === true) {
        await axios.delete(`http://localhost:3396/api/followings/${followerId}/${userId}`);
        this.setState({
          currentlyFollowing: false,
        });
        console.log('you are no longer following this user!');
      } else {
        await axios.post(`http://localhost:3396/api/followings/${followerId}/${userId}`);
        this.setState({
          currentlyFollowing: true,
        });
        console.log('you now following this user');
      }
    } else {
      this.props.history.push('/login');
    }
  }
  makeOffer() {
    console.log('u just clicked a button', this.props.active_user)
    if(this.props.active_user) {
      this.setState({
        bartering: true
      })
    }else {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        Welcome to the Buyer Post Page!
        <h1>{this.props.current_post.username}'s posting</h1>
=======
        hello from buyer post
>>>>>>> fixed status bar and tryng to work on chat right now
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
            <strong>{this.props.current_post.username}</strong> wants to trade this item for:{' '}
            {this.props.current_post.demand}
          </h4>
          <h4>Status: {this.props.current_post.status}</h4>
        </div>
        {this.state.currentlyFollowing === true ? (
          <RaisedButton
            label="Unfollow"
            secondary={true}
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
        {this.state.currentlyWatching === true ? (
          <RaisedButton
            label="Unwatch"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.toggleWatchList()}
          />
        ) : (
          <RaisedButton
            label="Add to Watch List"
            style={{ margin: 12 }}
            onClick={() => this.toggleWatchList()}
          />
        )}
          <RaisedButton
            label="MAKE OFFER"
            backgroundColor="#a4c639"
            style={{ margin: 12 }}
            onClick={() => this.makeOffer()}
          />
          {this.state.bartering && <Chattest post={this.props.current_post}/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
<<<<<<< HEAD
=======
    active_user: state.active_user
>>>>>>> fixed status bar and tryng to work on chat right now
  };
}

export default connect(mapStateToProps)(BuyerPost);
