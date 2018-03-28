import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList, addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

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

// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
// watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class SellersPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    }
    this.giveNotifications.bind(this)
  }
  async componentWillMount() {
    // grab data from db, update store
    try {
      const id = localStorage.id;
      const { data } = await axios.get(`http://localhost:3396/api/posts/${id}`);
      this.setState({
        lists: data
      })
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }
  async componentDidMount() {
    try{
      const obj = {};
      const messages = this.props.history.location.state;
      for(var i = 0; i< messages.length; i++) {
        obj[messages[i].postId] ? obj[messages[i].postId]++ : obj[messages[i].postId]=1
      }
      const entries = Object.entries(obj)
      for(var i = 0; i < entries.length; i++) {
        this.giveNotifications(entries[i])
      }
    }catch(err) {
      console.log('err in sellersPostList', err)
    }
  }
  giveNotifications(entries) {
    const element = window.document.getElementById(entries[0]);
    console.log('element and content', entries)
    element.textContent = entries[1]
  }
  switchToSinglePost = post => {
    console.log('Clicked post.id:', post.id);
    this.props.addCurrentPost(post);
    this.props.history.push(`/post/${post.id}`);
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
                    <p id={`${post.id}`}></p>
                  </span>
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
    current_list: state.current_list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
      addCurrentPost
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SellersPostList);
