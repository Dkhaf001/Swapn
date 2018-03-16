import React, { Component } from 'react'
import Post from './post.jsx';

class PostList extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        Hello from Postlist
        <Post />
      </div>
    )
  }
}

export default PostList