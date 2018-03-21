import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
      const data = await axios.get(`http://localhost:3369/users/${this.props.current_profile.user_id}`);
      this.setState({ user: data });
      // create rout in backend
      const following = await axios.get(`http://localhost:3369/followings/${this.props.active_user.id}/${this.state.user.id}`);
      if (following.row.length > 1) {
        this.setState({ following: true });
      }
    } catch (err) {
      console.log('Bio Component Error');
    }
  }
  buttonCheck = () => {
    if (following) {
      return <button>Unfollow</button>;
    }
    return <button>Follow</button>;
  };
  sellerView = () => {
    // profile pic
    // location
    // user rating
    // # of Followers

    <div>
      <img src={this.state.user.phot_url} />
      <h3>{this.state.user.username}</h3>
      <p>Location:{this.state.user.location}</p>
      <p>User:{this.state.user.rep}</p>
      <p>{this.state.user.rep_count}</p>
      <p>#followers: {this.state.user.follower_count}</p>
    </div>;
  };
  buyerView = () => {
    // profile pic
    // location
    // user rating
    // follow or unfollow button
    <div>
      <img src={this.state.user.phot_url} />
      <h3>{this.state.user.username}</h3>
      <p>Location:{this.state.user.location}</p>
      <p>User:{this.state.user.rep}</p>
      <p>{this.state.user.rep_count}</p>
      {buttonCheck()}
    </div>;
  };
  render() {
    if (this.props.active_user.id === this.current_profile.id) {
      return this.sellerView();
    }
    return this.buyerView();
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    current_profile: state.current_profile,
  };
}

export default connect(mapStateToProps)(Bio);
// might not need this page just do rendering on profile page
