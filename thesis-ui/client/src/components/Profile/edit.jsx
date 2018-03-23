import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// this should be a popup that allows the user to update his profile details and profile pic
class Edit extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      main_photo: ''
    };
  }
  componentWillMount() {
    this.setState({
      location: this.props.active_user.location,
      main_photo: this.props.active_user.photo_url
    });
  }
  // need two imput feild set gut request with axios when submit// needs photo upload
  handleSubmit = async () => {
    try {
      await axios.put('http://localhost:3396/users/', {
        user_id: this.props.currentUser.id,
        location: this.state.location,
        photo_url: this.state.main_photo
      });
      console.log('Succes Updated User Profile');
    } catch (err) {
      console.log('Update User Profile Error:', err);
    }
  };

  render() {
    return (
      <div>
        <label>
          Location:{' '}
          <input
            name="location"
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            type="text"
          />
        </label>
        <label>
          add photo component
          {/* photos input */}
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}

export default connect(mapStateToProps)(Edit);
