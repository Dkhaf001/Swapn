import React, { Component } from 'react'

class FollowingsListEntry extends Component {
  constructor(props) {
    super(props)
  }
  async handleUnfollowButtonClick() {
    try{
      const { data } = await axios.delete(`http://localhost:3396/api/followings/${this.props.active_user.id}/${this.props.following.id}`)
      this.props.following = null;
    } catch(err) {
      console.log('err unfollwing user',err)
    }
  }
  render() {
    return(
      <div>
        {this.props.following &&         
        <div>
        username: {this.props.following.username}
        <br />
        photo: {this.props.following.photo_url && <img src={this.props.following.photo_url}/>}
        <br />
        <button onClick={()=>this.handleUnfollowButtonClick()}>Unfollow</button>
       </div>}
      </div>
    )
  }
}

export default FollowingsListEntry;