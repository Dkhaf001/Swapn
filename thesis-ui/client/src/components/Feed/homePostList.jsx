import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

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

  async componentWillMount() {
    // grab data from db, update store
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('err fetching posts');
    }
  }
  switchToSinglePost = (post) => {
    console.log('Clicked post.id:', post.id);
    this.props.addCurrentPost(post);
  };
  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
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
                onClick={this.switchToSinglePost}
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
