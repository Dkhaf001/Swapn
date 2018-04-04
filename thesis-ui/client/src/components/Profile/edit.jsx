import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BioPhotoUpload from '../Photo/bioPhoto.jsx';

const { REST_SERVER_URL } = process.env;
const { S3_SERVER_URL } = process.env;
class Edit extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      main_photo: ''
    };
  }
  async componentDidMount() {
    const userId = localStorage.id;
    try {
      const data = await axios.get(`${S3_SERVER_URL}/api/${userId}`);
      // console.log('bio', data);

      this.setState({
        location: this.props.active_user.location,
        main_photo: this.props.active_user.photo_url
      });
    } catch (err) {}
  }
  // need two imput feild set gut request with axios when submit// needs photo upload
  handleSubmit = async () => {
    try {
      await axios.put(`${REST_SERVER_URL}/users/location`, {
        user_id: this.props.currentUser.id,
        location: this.state.location
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
        {/* <label>
          <input
            name="location"
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
            type="text"
          />
         </label>
         <button onClick={this.handleSubmit}>Submit</button> */}
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
