import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Chattest from '../Chat/Chattest.jsx';
import randomstring from 'randomstring';
import path from 'path';
import ViewSlide from '../Photo/viewPhotoSlider.jsx';
import { addImages } from '../../actions';
import { bindActionCreators } from 'redux';
import Popout from './popout.jsx';

const { REST_SERVER_URL } = process.env;
class BuyerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      photos: [],
      currentlyFollowing: '',
      currentlyWatching: '',
      isLoggedIn: false,
      bartering: false,
      room_id: '',
      buyer_username: ''
    };
    this.makeOffer = this.makeOffer.bind(this);
  }

  async componentWillMount() {
    this.getPhotos();
    if (!this.props.current_post) {
      this.getPost();
    }

    if (localStorage.token) {
      this.getBartering();
      this.getFollowing();
      this.getWatching();
      this.setState({
        isLoggedIn: true
      });
    }
  }
  getBartering = async () => {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      const buyerUsername = this.props.active_user.username; // localStorage.getItem('username');;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/offers/getSingleOffer/${buyerUsername}/${postId}`
      );
      if (data.rowCount > 0) {
        this.setState({
          room_id: data.rows[0] ? data.rows[0].room_id : null,
          bartering: true
        });
      } else {
        this.setState({
          bartering: false
        });
      }
    } catch (err) {
      console.log('err get bartering status', err);
    }
  };
  getPost = async () => {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/posts/fetchSinglePost/${postId}`
      );
      // console.log('successfully received post', data);
      // console.log('what is this??', data[0]);
      this.props.addCurrentPost(data[0]);
      // this.setState({
      //   post: data[0],
      // });
    } catch (err) {
      console.log('error getPost', err);
    }
  };

  getPhotos = async () => {
    try {
      const postId = this.props.current_post.id;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/photos/${postId}`
      );
      console.log('successfully received photos');
      const images = data.rows.map(values => JSON.parse(values.url));
      this.setState({
        photos: images
      });
      this.props.addImages(images);
    } catch (err) {
      console.log('error getphoto', err);
    }
  };

  getFollowing = async () => {
    try {
      const userId = this.props.current_post.user_id;
      const followerId = localStorage.id;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/followings/single/${followerId}/${userId}`
      );
      console.log('successfully received following list', data);

      if (data.rowCount > 0) {
        this.setState({
          currentlyFollowing: true
        });
      } else {
        this.setState({
          currentlyFollowing: false
        });
      }
    } catch (err) {
      console.log('error getting followers!');
    }
  };

  getWatching = async () => {
    try {
      const userId = localStorage.id;
      const postId = this.props.current_post.id;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/watchers/${userId}/${postId}`
      );
      console.log('successfully received watch list', data);
      if (data.rowCount > 0) {
        this.setState({
          currentlyWatching: true
        });
      } else {
        this.setState({
          currentlyWatching: false
        });
      }
    } catch (err) {
      console.log('error getting watch list!');
    }
  };

  toggleWatchList = async () => {
    const userId = localStorage.id;
    const postId = this.props.current_post.id;
    if (localStorage.id) {
      if (this.state.currentlyWatching === true) {
        await axios.delete(
          `${REST_SERVER_URL}/api/watchers/${userId}/${postId}`
        );
        if (this.props.current_post.watch_count > 0) {
          axios.put(`${REST_SERVER_URL}/api/posts/decreasewatch/${postId}`);
        }
        this.setState({
          currentlyWatching: false
        });
        console.log('you are no longer watching this post');
      } else {
        await axios.post(`${REST_SERVER_URL}/api/watchers/${userId}/${postId}`);
        axios.put(`${REST_SERVER_URL}/api/posts/increasewatch/${postId}`);
        this.setState({
          currentlyWatching: true
        });
        console.log('you are now watching this post');
      }
    } else {
      this.props.history.push('/login');
    }
  };

  toggleFollowList = async () => {
    const userId = this.props.current_post.user_id;
    const followerId = localStorage.id;
    if (localStorage.id) {
      if (this.state.currentlyFollowing === true) {
        await axios.delete(
          `${REST_SERVER_URL}/api/followings/${followerId}/${userId}`
        );
        this.setState({
          currentlyFollowing: false
        });
        console.log('you are no longer following this user!');
      } else {
        await axios.post(
          `${REST_SERVER_URL}/api/followings/${followerId}/${userId}`
        );
        this.setState({
          currentlyFollowing: true
        });
        console.log('you now following this user');
      }
    } else {
      this.props.history.push('/login');
    }
  };

  makeOffer = async offer => {
    try {
      console.log('you are making this offer', offer);
      const roomId = randomstring.generate();
      const message = {
        from: this.props.active_user.username,
        to: this.props.current_post.username,
        postId: this.props.current_post.id,
        roomId,
        message: offer,
        postTitle: this.props.current_post.title,
        buyer_username: this.props.active_user.username,
        img: this.props.active_user.photo_url,
        date: new Date().toUTCString()
      };
      this.props.socket.emit('message', message);
      this.setState({
        room_id: roomId,
        buyer_username: this.props.active_user.username
      });
      if (this.props.active_user) {
        this.setState({
          bartering: true
        });
        const { data } = await axios.post(`${REST_SERVER_URL}/api/offers/`, {
          post_id: this.props.current_post.id,
          buyer_username: this.props.active_user.username,
          room_id: roomId
        });
        console.log('just add offer to offer table', data);
      } else {
        this.props.history.push('/login');
      }
    } catch (err) {
      console.log('makeOffer Error', err);
    }
  };

  switchToProfile = async userId => {
    try {
      this.props.history.push(`/othersprofile/${userId}`);
    } catch (err) {
      console.log('error on switchToProfile - buyingPostList');
    }
  };

  async cancelOffer() {
    console.log('cancel button clicked');
    try {
      const userName = localStorage.username;
      const postId = this.props.current_post.id;
      await axios.delete(
        `${REST_SERVER_URL}/api/offers/deleteOffer/${userName}/${postId}`
      );
      this.setState({
        bartering: false
      });
      this.props.socket.emit('deleteOffers', this.props.current_post.id);
    } catch (err) {
      console.log('err deleteing offer');
    }
  }

  render() {
    return this.props.current_post ? (
      <div className="buyerpost">
        <div className="postcardcontainer">
          <div className="postcard">
            <ViewSlide />
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <h1>
              <a
                onClick={() =>
                  this.switchToProfile(this.props.current_post.user_id)
                }
              >
                {this.props.current_post.username}
              </a>'s posting
            </h1>
            <h1>
              <strong>{this.props.current_post.title}</strong>
            </h1>
            <h3>{this.props.current_post.description}</h3>
            <h3>{this.props.current_post.condition}</h3>
            <h3>{this.props.current_post.location}</h3>
            <h4>
              <strong
                onClick={() =>
                  this.switchToProfile(this.props.current_post.user_id)
                }
              >
                {this.props.current_post.username}
              </strong>{' '}
              trading for: {this.props.current_post.demand}
            </h4>
            <h4>Status: {this.props.current_post.status}</h4>
          </div>
        </div>
        <div className="postbuttons">
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
          {this.state.currentlyWatching === true
            ? this.props.current_post.status !== 'SWAPPED' && (
                <RaisedButton
                  label="Unwatch"
                  secondary={true}
                  style={{ margin: 12 }}
                  onClick={() => this.toggleWatchList()}
                />
              )
            : this.props.current_post.status !== 'SWAPPED' && (
                <RaisedButton
                  label="Add to Watch List"
                  style={{ margin: 12 }}
                  onClick={() => this.toggleWatchList()}
                />
              )}
          {this.state.bartering &&
            this.props.current_post.status !== 'SWAPPED' && (
              <RaisedButton
                label="Cancel Offer"
                secondary={true}
                style={{ margin: 12 }}
                onClick={() => this.cancelOffer()}
              />
            )}
          {!this.state.bartering &&
            this.props.current_post.status !== 'SWAPPED' && (
              <Popout makeOffer={this.makeOffer} {...this.props} />
            )}
        </div>
        <div className="chatbox">
          {this.state.bartering &&
            this.props.current_post.status !== 'SWAPPED' && (
              <Chattest
                post={this.props.current_post}
                roomId={this.state.room_id}
                buyer_username={this.state.buyer_username}
              />
            )}
        </div>
      </div>
    ) : (
      <div class="loading loading-lg" />
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
    active_user: state.active_user,
    socket: state.socket,
    images: state.images
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addImages
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerPost);
