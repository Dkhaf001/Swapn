import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Edit from './edit.jsx';
import path from 'path';

// import { bindActionCreators } from 'redux'
// import { bindActionCreators } from 'redux'
// this is what people see  need a view for logged in matches current profile user
// render edit view only if the user clicks the button to edit profile

class Bio extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      following: false,
    };
  }
  async componentWillMount() {
    try {
      console.log('Hi');
      // const data = await axios.get(`http://localhost:3369/users/${this.props.current_profile.user_id}`);
      // this.setState({ user: data });
      // create rout in backend
      // const following = await axios.get(`http://localhost:3369/followings/${this.props.active_user.id}/${this.state.user.id}`);
      // if (following.row.length > 1) {
      //   this.setState({ following: true });
      // }
    } catch (err) {
      console.log('Bio Component Error');
    }
  }
  buttonCheck = () => {
    if (this.state.following) {
      return <button onClick={this.unfollowButton}>Unfollow</button>;
    }
    return <button onClick={this.followButton}>Follow</button>;
  };
  followButton = async () => {
    await axios.post('http://localhost:3369/followings/', {
      user_id: localStorage.id,
      following_id: this.state.user.id,
    });
    this.setState({ following: true });
  };
  unfollowButton = async () => {
    await axios.delete(`http://localhost:3369/followings/${localStorage.id}/${this.state.user.id}`);
    this.setState({ following: true });
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
  };
}

export default connect(mapStateToProps)(Bio);
// might not need this page just do rendering on profile page
