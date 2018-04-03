import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addImages, addMainPhoto } from '../../actions';
import PhotoSlide from './photoslide.jsx';
import path from 'path';

const { REST_SERVER_URL } = process.env;
const { S3_SERVER_URL } = process.env;
class BioPhotoUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      posting: false,
      file: null,
      profilePic: 'http://laoblogger.com/images/default-profile-picture-5.jpg'
    };
  }
  async componentDidMount() {
    try {
      const userId = localStorage.id;
      const { data } = await axios.get(
        `${REST_SERVER_URL}/api/users/${userId}`
      );
      if (data[0].photo_url !== '') {
        this.setState({ profilePic: data[0].photo_url });
      }
    } catch (err) {}
  }

  // removingPhoto = async (input) => {
  //   try {
  //     const temp = this.state.images;
  //     const hold = temp.splice(input, 1);
  //     if (temp.length === 0) {
  //       this.props.addImages(null);
  //     } else {
  //       this.props.addImages(temp);
  //       this.setState({ images: temp });
  //     }
  //     const data = await axios.delete(`http://localhost:8593/api/removephoto/${hold[0].Key}`);
  //     console.log(data);
  //   } catch (err) {
  //     console.log('Error romvingPhoto photo index');
  //   }
  // };
  cancelPost = async () => {
    try {
      // const userId = localStorage.id;
      this.setState({ posting: false });
      // const data = await axios.delete(`http://localhost:8593/api/${posuserIdtId}`);
    } catch (error) {
      console.log(error);
    }
  };

  urlInput = async event => {
    await this.setState({ file: event.target.files[0] });
    console.log('this file', this.state.file);
  };

  // handleSubmit = () => {
  //   this.setState({
  //     posting: false,
  //     file: null,
  //   });
  // };

  handleUpload = async () => {
    // this.props.loadingTrue();
    const userId = localStorage.id;
    const value = this.state.val;
    const { file } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('post_id', userId); // this is from state post id
    // console.log('formData', formData);
    // change to match the route i need for dp route
    await axios.delete(`${S3_SERVER_URL}/api/${userId}`);
    // 1 changes to postID
    const { data } = await axios.post(
      `${S3_SERVER_URL}/api/addProfilePic/${userId}`,
      formData
    );

    this.setState({
      profilePic: `https://s3-us-west-1.amazonaws.com/barterbruh/${data.key}`,
      file: null,
      posting: false
    });

    await axios.put(`${REST_SERVER_URL}/api/users/profilepic`, {
      user_id: localStorage.id,
      photo_url: this.state.profilePic
    });

    // 'https://{s3-us-west-1}.amazonaws.com/{barterbruh}/{1/1de93ec.jpg}'
  };

  // fetchAlbum = async (postId) => {
  //   try {
  //     const data = await axios.get(`http://localhost:8593/api/${postId}`);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  renderForm = () => (
    <div>
      <img
        style={{ width: '128px', height: '128px' }}
        src={this.state.profilePic}
      />
      <form>
        <label>
          Upload:
          <input type="file" onChange={this.urlInput} />
          {/* need to clear file after upload look up */}
        </label>
      </form>
      {this.state.file ? (
        <button onClick={this.handleUpload}>Upload</button>
      ) : null}
      {/* <button onClick={this.fetchAlbum}>Fetch</button> */}
      {/* <button onClick={this.removePhoto}>DeletePhoto</button>
      <button onClick={this.handleSubmit}>Submit</button> */}
      <button onClick={this.cancelPost}>Cancel</button>
    </div>
  );
  renderNormal = () => (
    <div>
      <img
        style={{ width: '128px', height: '128px' }}
        src={this.state.profilePic}
      />
      <br />
      <button
        className="btn btn-link"
        onClick={() => {
          this.setState({ posting: true });
        }}
      >
        <i className="icon icon-edit" /> Edit
      </button>
    </div>
  );
  render() {
    return (
      <div>{this.state.posting ? this.renderForm() : this.renderNormal()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
    images: state.images,
    npId: state.newPostId,
    main_photo: state.main_photo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addImages,
      addMainPhoto
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BioPhotoUpload);
