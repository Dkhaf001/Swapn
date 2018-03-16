import React, { Component } from 'react'
import Bio from './bio.jsx';
import Edit from './edit.jsx';

class Profile extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        Hello from Profile
        <Edit />
        <Bio />
      </div>
    )
  }
}

export default Profile