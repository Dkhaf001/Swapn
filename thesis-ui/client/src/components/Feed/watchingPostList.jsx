import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addWatchingList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

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
class WatchingPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watching: [],
    };
  }
  async componentDidMount() {
    // grab data from db, update store
    try {
      const id = localStorage.id;
      // console.log('the id is', localStorage.id);
      const { data } = await axios.get(`http://localhost:3396/api/watchers/${id}`);
      this.props.addWatchingList(data);
      this.setState({
        watching: data,
      });
      this.props.addWatchingList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }
  async removeFromWatchList(userId, postId) {
    try {
      await axios.delete(`http://localhost:3396/api/watchers/${userId}/${postId}`);
      const records = this.state.watching.filter(data => data.post_id !== postId);
      this.setState({ watching: records });
      this.props.addWatchingList(this.state.watching);
    } catch (err) {
      console.log('err deleting a post from your watch list');
    }
  }
  switchToSinglePost = (post) => {
    // console.log('Clicked post.id:', post.post_id);
    this.props.addCurrentPost(post);
    this.props.history.push(`/post/${post.post_id}`);
  };
  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.props.watching_list &&
            this.props.watching_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={() => {
                  this.switchToSinglePost(post);
                }}
                actionIcon={
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      this.removeFromWatchList(localStorage.id, post.post_id);
                    }}
                  >
                    <Delete color="white" />
                  </IconButton>
                }
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
    watching_list: state.watching_list,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addWatchingList,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchingPostList);
