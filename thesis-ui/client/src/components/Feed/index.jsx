import React, { Component } from 'react';
import Post from './post.jsx';
import PostList from './postlist.jsx';
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
        <PostList />
        <Post />
      </div>
    );
  }
}

export default Feed;
