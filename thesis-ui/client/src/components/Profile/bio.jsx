import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Edit from './edit.jsx';
import path from 'path';
import { bindActionCreators } from 'redux';
import { addCurrentProfile } from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';

const { REST_SERVER_URL } = process.env;
class Bio extends Component {
  constructor() {
    super();
    this.state = {
      currentlyFollowing: false
    };
  }
  async componentWillMount() {
    const url = window.location.href;
    let userId;
    if (url.includes('othersprofile')) {
      userId = path.basename(url);
    } else {
      userId = this.props.active_user.id;
    }
    try {
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/users/${userId}`
      );
      this.props.addCurrentProfile(data[0]);
      if (url.includes('othersprofile')) {
        this.getFollowing();
      }
    } catch (err) {
      console.log('Bio Component Error');
    }
  }

  getFollowing = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.props.current_profile.id;
    try {
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/followings/single/${userId}/${followerId}`
      );
      if (data.rowCount > 0) {
        this.setState({
          currentlyFollowing: true
        });
        // console.log('follow', this.state.currentlyFollowing);
      } else {
        this.setState({
          currentlyFollowing: false
        });
        // console.log('unfollow', this.state.currentlyFollowing);
      }
    } catch (err) {
      console.log('error getting followers!');
    }
  };

  buttonCheck = () =>
    this.state.currentlyFollowing ? (
      <RaisedButton
        label="Unfollow"
        secondary={true}
        style={{ margin: 12 }}
        onClick={this.unfollowButton}
      />
    ) : (
      <RaisedButton
        label="Follow"
        primary={true}
        style={{ margin: 12 }}
        onClick={this.followButton}
      />
    );

  followButton = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.props.current_profile.id;
    await axios.post(
      `${REST_SERVER_URL}/api/followings/${userId}/${followerId}`
    );
    this.setState({ currentlyFollowing: true });
  };

  unfollowButton = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.props.current_profile.id;
    await axios.delete(
      `${REST_SERVER_URL}/api/followings/${userId}/${followerId}`
    );
    this.setState({ currentlyFollowing: false });
  };

  sellerView = () => (
    <div className="bio" style={{ padding: '50px 0 0 50px' }}>
      <div>
        <Edit />
      </div>
      <h3>{this.props.current_profile.username}</h3>
      {/* <p>User:{this.state.user.rep}</p>
       <p>{this.state.user.rep_count}</p>
      <p>#followers: {this.state.user.follower_count}</p> */}
    </div>
  );

  buyerView = () => (
    <div className="bio" style={{ padding: '50px 0 0 30px' }}>
      {this.props.current_profile.photo_url ? (
        <img
          src={this.props.current_profile.photo_url}
          style={{ width: '128px', height: '128px' }}
          className="circle"
        />
      ) : (
        <img src="http://laoblogger.com/images/default-profile-picture-5.jpg" />
      )}
      <h3>{this.props.current_profile.username}</h3>
      {this.buttonCheck()}
    </div>
  );
  render() {
    const url = window.location.href;
    if (!url.includes('othersprofile')) {
      return this.sellerView();
    } else {
      return this.buyerView();
    }
  }
}
function mapStateToProps(state) {
  return {
    current_profile: state.current_profile,
    active_user: state.active_user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bio);
// might not need this page just do rendering on profile page
