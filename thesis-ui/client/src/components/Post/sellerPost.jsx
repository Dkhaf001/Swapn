import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import axios from 'axios';
import { Route } from 'react-router-dom';
import EditPost from './editPost.jsx';

class SellerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // photos: [],
      offerAccepted: false,
      accept: {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: this.props.current_post.status,
        main_photo: this.props.current_post.main_photo,
      },
      sold: false,
    };
  }

  async componentWillMount() {
    // this.getPhotos();
    if (this.props.current_post.status === 'Accepting Offers') {
      this.setState({
        offerAccepted: false,
      });
    } else if (this.props.current_post.status === 'Pending') {
      this.setState({
        offerAccepted: true,
      });
    } else if (this.props.current_post.status === 'BARTERED') {
      this.setState({
        offerAccepted: true,
        sold: true,
      });
    }
  }

  // async getPhotos() {
  // const postId = this.props.current_posts.id;
  // const { data } = await axios.get(
  //   `http://localhost:3396/api/photos/${postId}`
  // );
  // console.log('successfully received photos!');
  // this.setState({
  //   photos: data.rows
  // });
  // }

  editPost() {
    this.props.history.push('/editPost');
  }

  async acceptOffer() {
    try {
      const accept = {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: 'Pending',
        main_photo: this.props.current_post.main_photo,
      };
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      this.setState({
        offerAccepted: true,
        accept,
      });
      const data = await axios.put(`http://localhost:3396/api/posts/${userId}/${postId}`, accept);
      console.log('Successfully accepted an offer! Post status is now Pending');
    } catch (err) {
      console.log('Error accepting offer!');
    }
  }

  async cancelOffer() {
    try {
      const cancel = {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: 'Accepting Offers',
        main_photo: this.props.current_post.main_photo,
      };
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      const data = await axios.put(`http://localhost:3396/api/posts/${userId}/${postId}`, cancel);
      this.setState({
        offerAccepted: false,
        accept: cancel,
        sold: false,
      });
      console.log('Successfully cancelled an offer! Post status is now Accepting Offers');
    } catch (err) {
      console.log('Error cancelling offer!');
    }
  }

  async soldOffer() {
    try {
      const sold = {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: 'BARTERED',
        main_photo: this.props.current_post.main_photo,
      };
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      const data = await axios.put(`http://localhost:3396/api/posts/${userId}/${postId}`, sold);
      this.setState({
        offerAccepted: false,
        accept: sold,
        sold: true,
      });
      console.log('Successfully bartered an offer! Post status is now BARTERED');
      this.props.history.push('/home');
    } catch (err) {
      console.log('Error completing barter transaction!');
    }
  }

  render() {
    return this.props.current_post ? (
      <div>
        <h1>Welcome to your post!</h1>
        <div>
          <img src={this.props.current_post && this.props.current_post.main_photo} />
        </div>
        <div>
          <h1>
            <strong>{this.props.current_post && this.props.current_post.title}</strong>
          </h1>
          <h3>{this.props.current_post && this.props.current_post.description}</h3>
          <h3>{this.props.current_post && this.props.current_post.condition}</h3>
          <h3>{this.props.current_post && this.props.current_post.location}</h3>
          <h4>
            <strong>{this.props.current_post && this.props.current_post.username}</strong> wants to
            trade this item for: {this.props.current_post && this.props.current_post.demand}
          </h4>
          <h4>Status: {this.props.current_post && this.state.accept.status}</h4>
        </div>
        {this.state.sold === false ? (
          <RaisedButton
            label="Edit Post"
            primary={true}
            style={{ margin: 12 }}
            onClick={() => this.editPost()}
          />
        ) : null}
        {this.state.sold === false && this.state.offerAccepted === true ? (
          <RaisedButton
            label="Complete Transaction"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.soldOffer()}
          />
        ) : null}
        <br />
        {this.state.offerAccepted === false ? (
          <RaisedButton
            label="Accept Offer"
            primary={true}
            style={{ margin: 12 }}
            onClick={() => this.acceptOffer()}
          />
        ) : this.state.sold === false ? (
          <RaisedButton
            label="Cancel Offer"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.cancelOffer()}
          />
        ) : (
          <RaisedButton
            label="Relist"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.cancelOffer()}
          />
        )}
      </div>
    ) : (
      <div>Loading</div>
    );
    //   }
    //   return ;
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps)(SellerPost);
