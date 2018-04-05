import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addWatchingList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

const { REST_SERVER_URL } = process.env;
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
class WatchingPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watching: []
    };
  }
  async componentDidMount() {
    try {
      const id = localStorage.id;
      const { data } = await axios.get(`${REST_SERVER_URL}/api/watchers/${id}`);
      this.setState({
        watching: data
      });
      this.props.addWatchingList(data);
    } catch (err) {
      console.log('error on componentDidMount - watchingPostList');
    }
  }
  removeFromWatchList = async (userId, postId) => {
    try {
      await axios.delete(`${REST_SERVER_URL}/api/watchers/${userId}/${postId}`);
      const records = this.state.watching.filter(
        data => data.post_id !== postId
      );
      this.setState({ watching: records });
      this.props.addWatchingList(this.state.watching);
    } catch (err) {
      console.log('err deleting a post from your watch list');
    }
  };

  switchToSinglePost = async post => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.post_id}`);
    } catch (err) {
      console.log('error on switchToSinglePost - watchingPostList');
    }
  };
  render() {
    return (
      <div className="container" style={styles.root}>
        <div className="columns">
          {this.props.watching_list &&
            this.props.watching_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                style={{ width: 200, height: 300, margin: 10 }}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={() => this.switchToSinglePost(post)}
                actionIcon={
                  <IconButton
                    onClick={e => {
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    watching_list: state.watching_list
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addWatchingList
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(WatchingPostList);
