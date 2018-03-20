import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FollowingsListEntry from './FollowingListEntry.jsx'
import axios from 'axios'
//this component will be used in the profile feed renders all users from following table
class Following extends Component {
  constructor() {
    super();
    this.state = {
      followings: ''
    }
  }
  async componentDidMount() {
    try{
      const user_id = this.props.active_user.id || JSON.parse(window.localStorage.getItem('user')).id 
      const { data } = await axios.get(`http://localhost:3396/api/followings/${user_id}`) 
      console.log('this is the data', data)
      this.setState({
        followings: data
      })
    } catch(err) {
      console.log('err fetching users followings',err)
    }
  }
  render() {
    return (
    <div>
      Hello from Following
      {JSON.stringify(this.state.followings)}
      {this.state.followings && this.state.followings.map(following => {
        return <FollowingsListEntry key={following.id} following={following} />
      })}
    </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch) 
}
export default connect(mapStateToProps, mapDispatchToProps)(Following);
