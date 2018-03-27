import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class PhotoUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      posting: false,
      file: null,
      // val: {
      //   file: null,
      //   url: '',
      // },
    };
  }

  cancelPost = async (postId) => {
    try {
      this.setState({ posting: false });
      const data = await axios.delete('http://localhost:8593/api/1');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  urlInput = async (event) => {
    await this.setState({ file: event.target.files[0] });
    console.log('this file', this.state.file);
  };

  handleSubmit = () => {
    this.setState({
      posting: false,
      file: null,
    });
  };
  handleUpload = async (postId) => {
    // this.props.loadingTrue();
    const value = this.state.val;

    const { file } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('post_id', postId); // this is from state post id
    // console.log('formData', formData);
    // change to match the route i need for dp route

    // 1 changes to postID
    await axios.post(`http://localhost:8593/api/addphoto/${postId}`, formData);
    this.setState({
      file: null,
    });
  };

  removePhoto = async (postId, key) => {
    try {
      const data = await axios.delete(`http://localhost:8593/api/removephoto/${postId}/${key}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAlbum = async (postId) => {
    try {
      const data = await axios.get(`http://localhost:8593/api/${postId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // photos = (bucket) => {
  // <img src=`https://barterbruh.s3.amazonaws.com/${key}` /> ;
  // };

  renderForm = () => (
    <div>
      <img
        style={{ width: '128px', height: '128px' }}
        src={'https://s3-us-west-1.amazonaws.com/barterbruh/1/1de93ec.jpg'}
      />
      <form>
        <label>
          Upload:
          <input type="file" onChange={this.urlInput} />
          {/* need to clear file after upload look up */}
        </label>
      </form>
      {this.state.file ? <button onClick={this.handleUpload}>Upload</button> : null}
      <button onClick={this.fetchAlbum}>Fetch</button>
      <button onClick={this.removePhoto}>DeletePhoto</button>
      <button onClick={this.handleSubmit}>Submit</button>
      <button onClick={this.cancelPost}>Cancel</button>
    </div>
  );
  renderNormal = () => (
    <div>
      <button
        onClick={() => {
          this.setState({ posting: true });
        }}
      >
        Add New Post
      </button>
    </div>
  );
  render() {
    if (this.state.posting) {
      return this.renderForm();
    }
    return this.renderNormal();
  }
}
function mapStateToProps(state) {
  return {
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps)(PhotoUpload);
