import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addSellingList } from '../../actions';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import axios from 'axios';

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

class SellersPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      messages: [],
      entries: [],
    };
  }
  async componentWillMount() {
    // grab data from db, update store
    try {
      const id = localStorage.id;
      const { data } = await axios.get(`http://localhost:3396/api/posts/${id}`);
      data.sort((a, b) => b.id - a.id);
      this.setState({ lists: data });
      // console.log('hello from sellerspostlist', data);
      this.props.addSellingList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  switchToSinglePost = async (post) => {
    // console.log('!!!shayne::Clicked post.id:', post);
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('sellerpostswitch', err);
    }
  };

  async removePost(userId, postId) {
    try {
      await axios.delete(`http://localhost:3396/api/posts/${userId}/${postId}`);
      console.log('successfully deleted post from selling list');
      const records = this.state.lists.filter(data => data.post_id !== postId);
      this.setState({ lists: records });
      this.props.addSellingList(this.state.lists);
      this.props.history.push('/profile/selling');
    } catch (err) {
      console.log('err deleting a post from your selling list');
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.props.selling_list &&
            this.props.selling_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                    <p id={`${post.id}`}>what the heck</p>
                  </span>
                }
                onClick={() => this.switchToSinglePost(post)}
                actionIcon={
                  <IconButton
                    onClick={(e) => {
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
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    selling_list: state.selling_list,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSellingList,
      addCurrentPost,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SellersPostList);
