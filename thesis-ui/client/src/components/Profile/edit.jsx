import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BioPhotoUpload from '../Photo/bioPhoto.jsx';
// this should be a popup that allows the user to update his profile details and profile pic
class Edit extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      main_photo: '',
    };
  }
  async componentWillMount() {
    const userId = localStorage.id;
    try {
      const data = await axios.get(`http://localhost:8593/api/${userId}`);
      console.log('bio', data);

      this.setState({
        location: this.props.active_user.location,
        main_photo: this.props.active_user.photo_url,
      });
    } catch (err) {}
  }
  // need two imput feild set gut request with axios when submit// needs photo upload
  handleSubmit = async () => {
    try {
      await axios.put('http://localhost:3396/users/location', {
        user_id: this.props.currentUser.id,
        location: this.state.location,
      });
      console.log('Succes Updated User Profile');
    } catch (err) {
      console.log('Update User Profile Error:', err);
    }
  };

  render() {
    return (
      <div>
        <BioPhotoUpload />
        <label>
          Location:{' '}
          <input
            name="location"
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            type="text"
          />
        </label>
        <label>add photo component</label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
  };
}

export default connect(mapStateToProps)(Edit);
