import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Edit from './edit.jsx';
import path from 'path';
import { bindActionCreators } from 'redux';
import { addCurrentProfile } from '../../actions';
// import { bindActionCreators } from 'redux'
// this is what people see  need a view for logged in matches current profile user
// render edit view only if the user clicks the button to edit profile

class Bio extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      currentlyFollowing: false,
    };
  }
  async componentDidMount() {
    const url = window.location.href;
    let userId;
    if (url.includes('othersprofile')) {
      userId = path.basename(url);
    } else {
      userId = this.props.active_user.id;
    }
    try {
      const { data } = await axios.get(`http://localhost:3396/api/users/${userId}`);
      console.log('!!!!', data);
      // this.props.addCurrentProfile(data[0]);
      this.setState({ user: data[0] });

      if (url.includes('othersprofile')) {
        this.getFollowing();
      }
    } catch (err) {
      console.log('Bio Component Error');
    }
  }

  getFollowing = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.state.user.id;
    try {
      const { data } = await axios.get(`http://localhost:3396/api/followings/single/${userId}/${followerId}`);
      console.log('successfully received following list');
      console.log('thisis data~~~~', data);
      if (data.rowCount > 0) {
        this.setState({
          currentlyFollowing: true,
        });
        console.log('follow', this.state.currentlyFollowing);
      } else {
        this.setState({
          currentlyFollowing: false,
        });
        console.log('unfollow', this.state.currentlyFollowing);
      }
    } catch (err) {
      console.log('error getting followers!');
    }
  };

  buttonCheck = () => {
    if (this.state.currentlyFollowing) {
      return <button onClick={this.unfollowButton}>Unfollow</button>;
    }
    return <button onClick={this.followButton}>Follow</button>;
  };
  followButton = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.state.user.id;
    await axios.post(`http://localhost:3396/api/followings/${userId}/${followerId}`);
    this.setState({ currentlyFollowing: true });
  };
  unfollowButton = async () => {
    const userId = this.props.active_user.id;
    const followerId = this.state.user.id;
    await axios.delete(`http://localhost:3396/api/followings/${userId}/${followerId}`);
    this.setState({ currentlyFollowing: false });
  };
  sellerView = () => (
    <div>
      <div>
        <img src={this.state.user.phot_url} />
        <Edit />
      </div>
      <h3>{this.state.user.username}</h3>
      <p>Location:{this.state.user.location}</p>
      <p>User:{this.state.user.rep}</p>
      <p>{this.state.user.rep_count}</p>
      <p>#followers: {this.state.user.follower_count}</p>
    </div>
  );
  buyerView = () => (
    <div>
      <img src={this.state.user.phot_url} />
      <h3>{this.state.user.username}</h3>
      <p>Location:{this.state.user.location}</p>
      <p>User:{this.state.user.rep}</p>
      <p>{this.state.user.rep_count}</p>
      {this.buttonCheck()}
    </div>
  );
  render() {
    const url = window.location.href;
    if (!url.includes('othersprofile')) {
      // this.current_profile.id;
      return this.sellerView();
    }
    return this.buyerView();
  }
}
function mapStateToProps(state) {
  return {
    current_profile: state.current_profile,
    active_user: state.active_user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentProfile,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Bio);
// might not need this page just do rendering on profile page
