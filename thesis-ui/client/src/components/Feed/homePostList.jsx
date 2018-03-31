import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Geolocation from '../Map/geolocation.jsx';
import { getDistance } from 'geolib';

const geolib = require('geolib');

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class HomePostList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  async componentWillMount() {
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      data.sort((a, b) => b.id - a.id);
      const modifiedData = await this.getDistance(data);
      this.props.addCurrentList(modifiedData);
    } catch (err) {
      console.log('Error on componentWillMount - homePostList');
    }
  }
  getDistance = async (data) => {
    for (let i = 0; i < data.length; i++) {
      if (i === 8) break;
      const address = data[i].location;
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      const distance = geolib.getDistance(
        {
          latitude: parseFloat(localStorage.getItem('usersLat')) || 33,
          longitude: parseFloat(localStorage.getItem('usersLng')) || -118,
        },
        latLng,
      );
      data[i].distance = Math.round(distance / 1609);
    }
    return data;
  };

  switchToSinglePost = async (post) => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('homepostswitch', err);
    }
  };

  handleChange = async (event, index, value) => {
    this.setState({ value });
    if (value === 1) {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      data.sort((a, b) => b.id - a.id);
      this.props.addCurrentList(data);
    } else if (value === 2) {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      // UNCOMMENT THIS CODE WHEN DANIEL FINISHES DISTANCE CALCULATION
      // data.sort((a, b) => a.distance - b.distance);

      // this is sorting by alphabetical order (placeholder until distance is setup)
      data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        return 1;
      });
      this.props.addCurrentList(data);
    }
  };

  render() {
    return (
      <div>
        <div>
          {' '}
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            openImmediately={false}
            style={{ float: 'right' }}
          >
            <MenuItem value={1} primaryText="Sort by Newest" />
            <MenuItem value={2} primaryText="Sort by Distance" />
          </DropDownMenu>
        </div>

        <div style={styles.root}>
          <GridList
            cellHeight={200}
            cols={4}
            padding={15}
            style={styles.gridList}
            style={{
              width: '80%',
              margin: '10 auto',
              // border: '2px solid rgb(11, 22, 241)',
              // backgroundColor: '#83d8ff',
            }}
          >
            {this.props.current_list &&
              this.props.current_list.map(post => (
                <GridTile
                  key={post.id}
                  title={post.title}
                  subtitle={
                    <div>
                      <span>
                        <b>{post.username}</b>
                      </span>
                      <br />
                      <span>
                        <b>{post.distance ? post.distance : null} miles away</b>
                      </span>
                    </div>
                  }
                  onClick={() => this.switchToSinglePost(post)}
                >
                  <img src={post.main_photo} />
                </GridTile>
              ))}
          </GridList>
          <Geolocation />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_list: state.current_list,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
      addCurrentPost,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePostList);
