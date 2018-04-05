import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addBarteringList } from '../../actions';
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

class BarteringsPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bartering: []
    };
  }

  async componentDidMount() {
    try {
      const username = localStorage.username;
      // console.log('the username is', localStorage.username);
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/offers/${username}`
      );
      this.setState({
        bartering: data
      });
      this.props.addBarteringList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  removeFromOffers = async (username, postId) => {
    try {
      console.log(
        'pls!!!!',
        `${REST_SERVER_URL}/api/offers/deleteOffer/${username}/${postId}`
      );
      await axios.delete(
        `${REST_SERVER_URL}/api/offers/deleteOffer/${username}/${postId}`
      );
      const records = this.state.bartering.filter(
        data => data.post_id !== postId
      );
      this.setState({ bartering: records });
      this.props.addBarteringList(records);
    } catch (err) {
      console.log('err deleting a post from your watch list');
    }
  };

  switchToSinglePost = async post => {
    try {
      // await this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.post_id}`);
    } catch (err) {
      console.log('barteringpostswitch', err);
    }
  };

  render() {
    return (
      <div className="container" style={styles.root}>
        <div className="columns">
          {this.props.bartering_list &&
            this.props.bartering_list.map(post => (
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
                      this.removeFromOffers(
                        localStorage.username,
                        post.post_id
                      );
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
    bartering_list: state.bartering_list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addBarteringList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BarteringsPostList);
