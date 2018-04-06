import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// import { GridList, GridTile } from 'material-ui/GridList';
// import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Geolocation from '../Map/geolocation.jsx';
import { getDistance } from 'geolib';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';

const { REST_SERVER_URL } = process.env;
const geolib = require('geolib');

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }
};

class HomePostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  async componentWillMount() {
    try {
      const { data } = await axios.get(`${REST_SERVER_URL}/api/posts`);
      data.sort((a, b) => b.id - a.id);
      // const modifiedData = await this.getDistance(data);
      this.setState({
        list: data
      });
      this.props.addCurrentList(data);
      const testData = this.props.current_list;
      this.runGetDistance(testData);
    } catch (err) {
      console.log('Error on componentWillMount - homePostList', err);
    }
  }
  runGetDistance = async data => {
    // const data = this.props.current_list;
    try {
      let counter = 0;
      for (let i = 0; i < data.length && counter < 10; i++) {
        if (!data[i].distance) {
          data[i] = await this.getDistance(data[i]);
          counter++;
        }
      }
      this.setState({
        list: data
      });
      console.log('after the iteration', data);
      setTimeout(() => this.runGetDistance(data), 2500);
    } catch (err) {
      console.log('err runget distance', err);
    }
  };
  getDistance = async data => {
    // console.log('reached data', data);
    // for (let i = 0; i < data.length; i++) {
    // console.log('reached here 4');
    // if (i === 8) break;
    const address = data.location;
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    // console.log('reached here 5');
    const lat1 = parseFloat(localStorage.getItem('usersLat')) || 33;
    const lon1 = parseFloat(localStorage.getItem('usersLng')) || -118;
    const lat2 = latLng.lat;
    const lon2 = latLng.lng;
    // console.log('reached here 6');
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    // const distance = geolib.getDistance(
    //   {
    //     latitude: parseFloat(localStorage.getItem('usersLat')) || 33,
    //     longitude: parseFloat(localStorage.getItem('usersLng')) || -118
    //   },
    //   latLng
    // );
    data.distance = Math.round(dist * 0.8684);
    // console.log('the result is ', data);
    // }
    return data;
  };
  switchToSinglePost = async post => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('homepostswitch', err);
    }
  };

  switchToProfile = async userId => {
    try {
      if (this.props.active_user) {
        userId === this.props.active_user.id
          ? this.props.history.push('/profile/selling')
          : this.props.history.push(`/othersprofile/${userId}`);
      } else {
        this.props.history.push('/login');
      }
    } catch (err) {
      console.log('error on switchToProfile - homePostList', err);
    }
  };

  render() {
    return (
      <div className="homepost">
        <div className="containerr">
          <div className="columnss">
            {this.state.list &&
              this.state.list
                .filter(post => post.status !== 'SWAPPED')
                .map(post => (
                  <div
                    className="card"
                    key={post.id}
                    onClick={() => this.switchToSinglePost(post)}
                  >
                    <div className="card-image centered">
                      <img src={post.main_photo} className="img-responsive" />
                      <div className="overlay">
                        <div className="overlaytext">
                          <strong>Description: </strong>
                          <br />
                          {post.description}
                          <Chip
                            style={{
                              margin: 'auto',
                              width: '100%',
                              bottom: '0',
                              position: 'absolute',
                              backgroundColor: 'rgb(208, 204, 208)'
                            }}
                            onClick={e => {
                              e.stopPropagation();
                              this.switchToProfile(post.user_id);
                            }}
                          >
                            <Avatar src={post.photo_url} />
                            <div
                              style={{ color: '#3a606e', fontWeight: 'bold' }}
                            >
                              {post.username}
                            </div>
                          </Chip>
                        </div>
                      </div>
                    </div>
                    <div className="bottomhalf">
                      <div className="card-header centered">
                        <div className="card-title h5 centered">
                          {post.title}
                        </div>
                        <div className="card-subtitle centered">
                          {post.distance ? (
                            `${post.distance} miles away`
                          ) : (
                            <LinearProgress
                              mode="indeterminate"
                              color={'rgb(3, 137, 108)'}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            <Geolocation />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_list: state.current_list,
    active_user: state.active_user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
      addCurrentPost
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePostList);

{
  /* <div>
<figure className="avatar avatar-lg float-left">
  <img src={post.photo_url} />
</figure>
<div style={{ color: 'white' }}>{post.username}</div>
</div> */
}
