import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { bindActionCreators } from 'redux'
// import { bindActionCreators } from 'redux'
// this is what people see  need a view for logged in matches current profile user
// render edit view only if the user clicks the button to edit profile

class Bio extends Component {
  constructor() {
    super();
  }
  render() {
    return <div>Hello from Bio</div>;
  }
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Bio);
// might not need this page just do rendering on profile page
