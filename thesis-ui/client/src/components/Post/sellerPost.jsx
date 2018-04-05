import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import axios from 'axios';
import { Route } from 'react-router-dom';
import path from 'path';
import { bindActionCreators } from 'redux';
import ViewSlide from '../Photo/viewPhotoSlider.jsx';
import EditPost from './editPost.jsx';
import Chattest from '../Chat/Chattest.jsx';
import { addImages } from '../../actions';

const { REST_SERVER_URL } = process.env;
const { S3_SERVER_URL } = process.env;
class SellerPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      offerAccepted: false,
      accept: {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: this.props.current_post.status,
        main_photo: this.props.current_post.main_photo
      },
      sold: false,
      offers: [],
      currentRoom: '',
      tradingWith: false,
      count: 0
    };
    this.acceptOffer = this.acceptOffer.bind(this);
  }
  componentWillMount() {
    this.getPhotos();
  }
  async componentDidMount() {
    await this.getOffers();
    if (this.props.location.state) {
      this.setState({
        currentRoom: this.props.location.state.roomId
      });
    } else {
      this.setState({
        currentRoom: this.props.room_id
      });
    }
    if (this.props.current_post.status === 'Accepting Offers') {
      this.setState({
        offerAccepted: false
      });
    } else if (this.props.current_post.status === 'Pending') {
      this.setState({
        offerAccepted: true
      });
    } else if (this.props.current_post.status === 'SWAPPED') {
      this.setState({
        offerAccepted: true,
        sold: true
      });
    }
  }
  async getOffers() {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/offers/fetchPostOffers/${postId}`
      );
      this.setState({
        offers: data.rows
      });

      if (this.props.current_post.tradingwith) {
        for (let i = 0; i < data.rows.length; i++) {
          if (
            data.rows[i].buyer_username === this.props.current_post.tradingwith
          ) {
            this.setState({
              tradingWith: this.props.current_post.tradingwith
            });
          }
        }
        if (!this.state.tradingWith) {
          alert(
            `${this.props.current_post.tradingWith} canceled his/her offer`
          );
          this.cancelOffer();
        }
      }
    } catch (err) {
      console.log('err sellerPost', err);
    }
  }

  getPhotos = async () => {
    try {
      const postId = this.props.current_post.id;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/photos/${postId}`
      );
      const images = data.rows.map(values => JSON.parse(values.url));
      this.setState({
        photos: images
      });
      this.props.addImages(images);
    } catch (err) {
      console.log('error getphoto', err);
    }
  };

  editPost() {
    this.props.history.push('/editPost');
  }

  async acceptOffer() {
    try {
      if (this.state.currentTalking) {
        this.setState({
          tradingWith: this.state.currentTalking
        });
        this.props.socket.emit('accept', {
          buyer: this.state.currentTalking,
          seller: this.props.current_post.username,
          post_id: this.props.current_post.id,
          title: this.props.current_post.title,
          status: 'progress'
        });
        const accept = {
          title: this.props.current_post.title,
          description: this.props.current_post.description,
          condition: this.props.current_post.condition,
          location: this.props.current_post.location,
          demand: this.props.current_post.demand,
          status: 'Pending',
          tradingWith: this.state.currentTalking,
          main_photo: this.props.current_post.main_photo
        };
        const userId = this.props.current_post.user_id;
        const postId = this.props.current_post.id;
        this.setState({
          offerAccepted: true,
          accept
        });
        const data = await axios.put(
          `${REST_SERVER_URL}/api/posts/update/${userId}/${postId}`,
          accept
        );
        await axios.post(`${REST_SERVER_URL}/api/email`, {
          seller: this.props.active_user.username,
          to: this.state.currentTalking,
          post: this.props.current_post.title
        });
      } else {
        alert('Please choose an offer to accept');
      }
    } catch (err) {
      console.log('Error accepting offer!');
    }
  }

  async cancelOffer() {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      this.props.socket.emit('deleteOffers', postId);
      const cancel = {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: 'Accepting Offers',
        tradingWith: '',
        main_photo: this.props.current_post.main_photo
      };
      const userId = this.props.current_post.user_id;
      const { data } = await axios.put(
        `${REST_SERVER_URL}/api/posts/update/${userId}/${postId}`,
        cancel
      );
      this.setState({
        offerAccepted: false,
        accept: cancel,
        sold: false
      });
      console.log(
        'Successfully cancelled an offer! Post status is now Accepting Offers',
        data
      );
    } catch (err) {
      console.log('Error cancelling offer!', err);
    }
  }

  async soldOffer() {
    try {
      const url = window.location.href;
      const postId = path.basename(url);
      this.props.socket.emit('deleteOffers', postId);
      const sold = {
        title: this.props.current_post.title,
        description: this.props.current_post.description,
        condition: this.props.current_post.condition,
        location: this.props.current_post.location,
        demand: this.props.current_post.demand,
        status: 'SWAPPED',
        tradingWith: '',
        main_photo: this.props.current_post.main_photo
      };
      const userId = this.props.current_post.user_id;
      const { data } = await axios.put(
        `${REST_SERVER_URL}/api/posts/update/${userId}/${postId}`,
        sold
      );
      this.setState({
        offerAccepted: false,
        accept: sold,
        sold: true
      });
      this.props.history.push('/home');
    } catch (err) {
      console.log('Error completing barter transaction!');
    }
  }
  handleUserClick = offer => {
    this.setState({
      currentRoom:
        this.state.currentRoom === offer.room_id ? null : offer.room_id
      // currentTalking: offer.buyer_username,
    });
  };

  denyActiveOffer = async (userName, offerId, offer) => {
    try {
      await axios.delete(
        `${REST_SERVER_URL}/api/offers/deleteOffer/${userName}/${offerId}`
      );
      const records = this.state.offers.filter(dat => dat.id !== offer);
      this.setState({ offers: records });
      console.log('Deleted Offer from seller');
    } catch (err) {
      console.log('err deleting a post from your selling active offer list');
    }
  };

  switchToProfile = async () => {
    try {
      this.props.history.push('/profile/selling');
    } catch (err) {
      console.log('error on switchToProfile - sellerPost');
    }
  };

  deletePost = async () => {
    try {
      const userId = this.props.current_post.user_id;
      const url = window.location.href;
      const postId = path.basename(url);
      await axios.delete(`${REST_SERVER_URL}/api/photos/removeall/${postId}`);
      await axios.delete(`${REST_SERVER_URL}/api/posts/${userId}/${postId}`);
      await axios.delete(`${S3_SERVER_URL}/s3/api/${postId}`);
      console.log('successfully delete post!');
      this.props.history.push('/home');
    } catch (err) {
      console.log('error deleting post');
    }
  };

  render() {
    return this.props.current_post ? (
      <div>
        <div className="postcard">
          <ViewSlide />
        </div>
        <div className="panel">
          <h1>
            <strong>
              {this.props.current_post && this.props.current_post.title}
            </strong>
          </h1>
          <h3>
            {this.props.current_post && this.props.current_post.description}
          </h3>
          <h3>
            {this.props.current_post && this.props.current_post.condition}
          </h3>
          <h3>{this.props.current_post && this.props.current_post.location}</h3>
          <h4>
            <strong onClick={() => this.switchToProfile()}>
              {this.props.current_post && this.props.current_post.username}
            </strong>{' '}
            wants to trade this item for:{' '}
            {this.props.current_post && this.props.current_post.demand}
          </h4>
          <h4>Status: {this.props.current_post && this.state.accept.status}</h4>
        </div>
        <div className="postbuttons">
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
          <RaisedButton
            label="Delete"
            secondary={true}
            style={{ margin: 12 }}
            onClick={() => this.deletePost()}
          />
        </div>
        <br />
        {this.state.tradingWith && (
          <div>You are now in transaction with {this.state.tradingWith}</div>
        )}
        {/* {this.state.offers &&
          this.state.offers.map(offer => (
            <div key={offer.id}>
              <div
                id={offer.room_id}
                onClick={() => this.handleUserClick(offer)}
              >
                <a>{offer.username}</a>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    this.denyActiveOffer(
                      offer.username,
                      this.props.current_post.id,
                      offer.id
                    );
                  }}
                >
                  Delete
                </button>
              </div>
              <div>
                {this.state.currentRoom === offer.room_id && (
                  <Chattest
                    roomId={this.state.currentRoom}
                    buyer={offer.buyer_username}
                    {...this.props}
                  />
                )}
              </div>
            </div>
          ))} */}
        <div className="chatrooms">
          {this.state.offers &&
            this.state.offers.map(offer => (
              <div key={offer.id}>
                <div
                  id={offer.room_id}
                  onClick={() => this.handleUserClick(offer)}
                >
                  <a>{offer.username}</a>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      this.denyActiveOffer(
                        offer.username,
                        this.props.current_post.id,
                        offer.id
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div>
          {this.state.currentRoom && (
            <Chattest roomId={this.state.currentRoom} {...this.props} />
          )}
        </div>
      </div>
    ) : (
      <div class="loading loading-lg" />
    );
    //   }
    //   return ;
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
    socket: state.socket,
    active_user: state.active_user,
    socket: state.socket,
    images: state.images
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addImages
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerPost);
