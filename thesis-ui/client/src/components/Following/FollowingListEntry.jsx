import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

class FollowingsListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following
    };
  }
  async handleUnfollowButtonClick() {
    try {
      const user_id =
        JSON.parse(window.localStorage.getItem('user')).id ||
        this.props.active_user.id;
      const { data } = await axios.delete(
        `http://localhost:3396/api/followings/${user_id}/${
          this.props.following.id
        }`
      );
      this.setState({
        following: null
      });
    } catch (err) {
      console.log('err unfollwing user', err);
    }
  }
  render() {
    return (
      <div>
        <List>
          {this.state.following && (
            <ListItem
              disabled={true}
              leftAvatar={<Avatar src={this.state.following.photo_url} />}
            >
              {this.state.following.username}
              <RaisedButton
                label="Unfollow"
                secondary={true}
                style={{ margin: 10 }}
                onClick={() => this.handleUnfollowButtonClick()}
              />
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}

export default connect(mapStateToProps)(FollowingsListEntry);
