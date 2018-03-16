import React, { Component } from 'react'
import {
  Login,
  Signup,
  Search,
  Chat,
  Feed,
  Navbar,
  Post,
  Profile
} from '../../components';

class View extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        Hello from View
        <Feed />
        <Login />
        <Signup />
        <Search />
        <Chat />
      </div>
    )
  }
}

export default View