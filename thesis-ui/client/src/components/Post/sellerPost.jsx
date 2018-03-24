import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import axios from 'axios';
import { Route } from 'react-router-dom';
import EditPost from './editPost.jsx';
// edit post should reopen addPost but with the info already filled out including photos
// should render chats if there are ongoing offers

// COMMENTS FROM EDDIE
// this component renders when the SELLER goes to their POST
// - need to link in follows
// - ADD more images
// - COMPLETED TRANSACTION = button that marks item as SOLD

class SellerPost extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   post: '',
    //   photos: []
    // };
  }

  async componentWillMount() {
    this.getPost();
    this.getPhotos();
  }

  async getPost() {
    // const userId = this.props.current_post.user_id;
    // const postId = this.props.current_post.id;
    // const { data } = await axios.get(
    //   `http://localhost:3396/api/posts/${userId}/${postId}`
    // );
    // console.log('successfully received post!');
    // this.setState({
    //   post: data.rows
    // });
  }

  async getPhotos() {
    // const postId = this.props.current_posts.id;
    // const { data } = await axios.get(
    //   `http://localhost:3396/api/photos/${postId}`
    // );
    // console.log('successfully received photos!');
    // this.setState({
    //   photos: data.rows
    // });
  }

  async removePost() {
    const userId = this.props.current_post.user_id;
    const postId = this.props.current_post.id;
    const { data } = await axios.delete(
      `http://localhost:3396/api/photos/${userId}/${postId}`
    );
    console.log('successfully deleted post!');
    // refresh page after successfully deleting?
  }

  editPost() {
    this.props.history.push('/editPost');
  }

  render() {
    return (
      <div>
        <h1>Welcome to your post!</h1>
        <div>
          <img src={this.props.current_post.main_photo} />
        </div>
        <div>
          <h1>
            <strong>{this.props.current_post.title}</strong>
          </h1>
          <h3>{this.props.current_post.description}</h3>
          <h3>{this.props.current_post.condition}</h3>
          <h3>{this.props.current_post.location}</h3>
          <h4>
            <strong>{this.props.current_post.username}</strong> wants to trade
            this item for: {this.props.current_post.demand}
          </h4>
          <h4>Status: {this.props.current_post.status}</h4>
        </div>
        <RaisedButton
          label="Edit Post"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => this.editPost()}
        />
        <RaisedButton
          label="Complete Transaction"
          secondary={true}
          style={{ margin: 12 }}
          // this onClick event should update the STATUS to SOLD
          // onClick={() => this.removePost()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post
  };
}

export default connect(mapStateToProps)(SellerPost);
