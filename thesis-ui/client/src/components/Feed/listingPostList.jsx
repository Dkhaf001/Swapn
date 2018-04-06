import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addSellingList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import path from 'path';

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

class ListingPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  async componentWillMount() {
    const url = window.location.href;
    try {
      if (url.includes('othersprofile')) {
        const userId = path.basename(url);
        const { data } = await axios.get(
          `${REST_SERVER_URL}/api/posts/${userId}`
        );
        data.sort((a, b) => b.id - a.id);
        this.setState({ listings: data });
        this.props.addSellingList(data);
        // filter out sold listings from sellers listing and render that
        // set state --> reder bottom
      }
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }
  switchToSinglePost = async post => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('error with switchToSinglePost');
    }
  };
  render() {
    return (
      <div className="container" style={styles.root}>
        <div className="columns">
          {this.state.listings &&
            this.state.listings.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                style={{ width: 200, height: 300, margin: 10 }}
                className={post.status === 'SWAPPED' ? 'swapped' : ''}
                subtitle={
                  <span>
                    <b>{post.id}</b>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={() => this.switchToSinglePost(post)}
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
    selling_list: state.selling_list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addSellingList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingPostList);

{
  /* <div style={styles.root}>
<GridList cellHeight={200} style={styles.gridList}>
  {this.state.listings &&
    this.state.listings.map(post => (
      <GridTile
        key={post.id}
        title={post.title}
        className={post.status === 'SWAPPED' ? 'swapped' : ''}
        subtitle={
          <span>
            <b>{post.id}</b>
            <b>{post.username}</b>
          </span>
        }
        onClick={() => this.switchToSinglePost(post)}
      >
        <img src={post.main_photo} />
      </GridTile>
    ))}
</GridList>
</div> */
}
