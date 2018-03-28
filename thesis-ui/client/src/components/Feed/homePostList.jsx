import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Photo from '../Photo/index.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
const geolib = require('geolib');

// ELBERT'S COMMENTS
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
// watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

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
//-------------------------------------------------------------
  async componentWillMount() {
    try{
      const { data } = await axios.get('http://localhost:3396/api/posts');
      data.sort((a, b) => b.id - a.id);

      for (let i = 0; i < data.length; i++) {
        if (i === 8) break;
        let address = data[i].location;
        let results = await geocodeByAddress(address);
        console.log('results is from', results[0].formatted_address);
        let latLng = await getLatLng(results[0]);
        console.log('SuccessHome', latLng);
        let distance = geolib.getDistance(
          {
            latitude: parseFloat(localStorage.getItem('usersLat')),
            longitude: parseFloat(localStorage.getItem('usersLng'))
          },
          latLng
        );
        console.log('right here', distance/1609);
        data[i].distance = Math.round(distance / 1609);
        console.log('the data obj is before', data);

      }
      
      console.log('the data obj is after', data);
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('Error:', err);
    }
  };
        
    
    
    
//-----------------------------------------------------

  switchToSinglePost = (post) => {
    console.log('Clicked post.id:', post.id);
    this.props.addCurrentPost(post);
    this.props.history.push(`/post/${post.id}`);
  };
  render() {
    return (
      <div>
        <div style={{ width: '50%', margin: '0 auto' }}>
          <Photo />
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
                    <span>
                      <b>{post.username}</b>
                    </span>
                  }
                  onClick={() => this.switchToSinglePost(post)}
                >
                  <img src={post.main_photo} />
                </GridTile>
              ))}
          </GridList>
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
