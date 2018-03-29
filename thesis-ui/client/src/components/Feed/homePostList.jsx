import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
  }

  async componentWillMount() {
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      data.sort((a, b) => b.id - a.id);

      // for (let i = 0; i < data.length; i++) {
      //   if (i === 8) break;
      //   const address = data[i].location;
      //   const results = await geocodeByAddress(address);
      //   // console.log('results is from', results[0].formatted_address);
      //   const latLng = await getLatLng(results[0]);
      //   // console.log('SuccessHome', latLng);
      //   const distance = geolib.getDistance(
      //     {
      //       latitude: parseFloat(localStorage.getItem('usersLat')) || 33,
      //       longitude: parseFloat(localStorage.getItem('usersLng')) || -118,
      //     },
      //     latLng,
      //   );
      //   // console.log('right here', distance/1609);
      //   data[i].distance = Math.round(distance / 1609);
      //   // console.log('the data obj is before', data)
      // }
      // console.log('the data obj is after', data);
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('Error:', err);
    }
  }

  switchToSinglePost = async (post) => {
    // console.log('!!!shayne::Clicked post.id:', post);
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('homepostswitch', err);
    }
  };
  render() {
    return (
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
