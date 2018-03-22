import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
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
      const id = this.props.active_user.id;
      console.log('the id is', this.props.active_user);
      const { data } = await axios.get(`http://localhost:3396/api/watchers/${id}`);
      this.props.addCurrentList(data);
      this.setState({
        watching: data,
      });
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  async removeFromWatchList(userId, postId) {
    try {
      await axios.delete(`http://localhost:3396/api/watchers/${userId}/${postId}`);
      const records = this.state.watching.filter(data => data.post_id !== postId);
      this.setState({ watching: records });
    } catch (err) {
      console.log('err deleting a post from your watch list');
    }
  }

  switchToSinglePost = (post) => {
    console.log('Clicked post.id:', post.id);
    this.props.addCurrentPost(post);
    this.props.history.push(`/post/${post.id}`);
  };

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.state.watching &&
            this.state.watching.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={(e) => {
                  e.preventDefault();
                  this.switchToSinglePost(post);
                }}
                actionIcon={
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      this.removeFromWatchList(this.props.active_user.id, post.post_id);
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
    current_list: state.current_list,
    active_user: state.active_user,
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchingPostList);
