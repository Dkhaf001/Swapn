import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FollowingsListEntry from './FollowingListEntry'
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
      const user_id = this.props.active_user.id
      // const user_id = JSON.parse(window.localStorage.getItem('user')).id 
      const { data } = await axios.get(`http://localhost:3396/api/followings/${user_id}`) 
      this.setState({
        followings: data
      })
    } catch(err) {
      console.log('err fetching users followings',err)
    }
  }
  render() {
    return 
    <div>
      Hello from Following
      {this.state.followings && this.state.followings.map(following => {
        return 
          <FollowingsListEntry key={following.id} following={following} />
      })}
    </div>
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
