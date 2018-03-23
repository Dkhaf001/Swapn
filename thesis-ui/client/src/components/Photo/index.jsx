import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class PhotoUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      posting: false,
      val: {
        file: null,
        url: '',
        description: '',
      },
    };
  }
  cancelPost = () => {
    this.setState({ posting: false });
  };
  urlInput = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  descInput = (event) => {
    const value = this.state.val;
    value.description = event.target.value;
    this.setState({ val: value });
  };
  handleSubmit = () => {
    this.props.loadingTrue();
    const value = this.state.val;
    const { file } = this.state;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('post_id', this.props.current_post.id);
    // change to match the route i need for dp route
    axios.post(`/api/${this.props.currentUser.username}/content`, formData).then(() => {
      this.setState({
        posting: false,
        val: {
          url: '',
          description: '',
        },
      });
      this.props.loadingFalse();
      this.props.refreshCurrentUser();
    });
  };

  renderForm = () => (
    <div>
      <form>
        <label>
          Upload:
          <input type="file" onChange={this.urlInput} />
          {/* Description:
          <input
            type="text"
            value={this.state.val.description}
            onChange={this.descInput}
            placeholder="enter description here"
          /> */}
        </label>
      </form>
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
    active_user: state.active_user,
  };
}

export default connect(mapStateToProps)(PhotoUpload);
