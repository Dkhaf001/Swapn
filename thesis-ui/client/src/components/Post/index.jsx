import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentWillMount() {
    // axios.get('http://localhost:3396/api/posts/login');
  }
  render() {
    return <div>Hello from Post</div>;
  }
}

export default Post;
