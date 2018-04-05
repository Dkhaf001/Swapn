import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addSellingList } from '../../actions';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import axios from 'axios';

const { REST_SERVER_URL } = process.env;
const { S3_SERVER_URL } = process.env;
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

class SellersPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      messages: []
    };
  }
  async componentWillMount() {
    try {
      const id = localStorage.id;
      const { data } = await axios.get(`${REST_SERVER_URL}/api/posts/${id}`);
      data.sort((a, b) => b.id - a.id);
      this.setState({ lists: data });
      this.props.addSellingList(data);
    } catch (err) {
      console.log('error with componentWillMount - sellersPostList');
    }
  }

  switchToSinglePost = async post => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('error with switchToSinglePost - sellersPostList');
    }
  };

  async removePost(userId, postId) {
    try {
      // delete photos from sql then delte post then s3
      await axios.delete(`${REST_SERVER_URL}/api/photos/removeall/${postId}`);
      await axios.delete(`${REST_SERVER_URL}/api/posts/${userId}/${postId}`);
      await axios.delete(`${S3_SERVER_URL}/api/${postId}`);

      console.log('successfully deleted post from selling list');
      const records = this.state.lists.filter(data => data.post_id !== postId);
      this.setState({ lists: records });
      this.props.addSellingList(this.state.lists);
      // remove from s3 photos
      // remove photos from sql dataBASE
      //
      //
      //
      this.props.history.push('/profile/selling');
    } catch (err) {
      console.log('err deleting a post from your selling list');
    }
  }

  render() {
    return (
      <div className="container" style={styles.root}>
        <div className="columns">
          {this.props.selling_list &&
            this.props.selling_list.map(post => (
              <GridTile
                className="column col-3"
                key={post.id}
                title={post.title}
                style={{ width: 200, height: 300, margin: 10 }}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                    {post.watch_count > 0 ? (
                      <p>{post.watch_count} users watching</p>
                    ) : null}
                  </span>
                }
                onClick={() => this.switchToSinglePost(post)}
                actionIcon={
                  <IconButton
                    onClick={e => {
                      e.stopPropagation();
                      this.removePost(localStorage.id, post.id);
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
    messages: state.messages,
    selling_list: state.selling_list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSellingList,
      addCurrentPost
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SellersPostList);
