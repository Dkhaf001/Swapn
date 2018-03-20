import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
class FollowingsListEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      following: this.props.following
    }
  }
  async handleUnfollowButtonClick() {
    try{
      const user_id = JSON.parse(window.localStorage.getItem('user')).id || this.props.active_user.id
      const { data } = await axios.delete(`http://localhost:3396/api/followings/${user_id}/${this.props.following.id}`)
      this.setState({
        following: null
      })
    } catch(err) {
      console.log('err unfollwing user',err)
    }
  }
  render() {
    return(
      <div>
        {this.state.following &&         
        <div>
        username: {this.state.following.username}
        <br />
        photo: {this.state.following.photo_url && <img src={this.state.following.photo_url}/>}
        <br />
        <button onClick={()=>this.handleUnfollowButtonClick()}>Unfollow</button>
       </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user
  }
}

export default connect(mapStateToProps)(FollowingsListEntry)