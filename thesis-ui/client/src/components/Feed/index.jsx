import React, { Component } from 'react';
import Post from './post.jsx';
import HomePostList from './homePostList.jsx';
import OtherPostList from './otherPostList.jsx';
import SellersPostList from './sellersPostList.jsx';
//feed will render feed list for logged in or logged out
//feed layout will be determined by classes
class Feed extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        Hello from Feed
        <HomePostList />
        <Post />
        <OtherPostList />
        <SellersPostList />

      </div>
    );
  }
}

export default Feed;
