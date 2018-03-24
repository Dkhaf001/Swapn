import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      title: this.props.current_post.title,
      description: this.props.current_post.description,
      condition: this.props.current_post.condition,
      location: this.props.current_post.location,
      demand: this.props.current_post.demand,
      main_photo: this.props.current_post.main_photo
    };
  }

  async submitEditPost() {
    try {
      let userId = this.props.current_post.user_id;
      let postId = this.props.current_post.id;
      const data = await axios.put(
        `http://localhost:3396/api/posts/${userId}/${postId}`,
        this.state
      );
      console.log('successfully edited post!');
    } catch (err) {
      console.log('error editing post');
    }
  }

  render() {
    return (
      <div>
        Hello from Edit Post
        <TextField
          floatingLabelText="Title"
          name="title"
          defaultValue={`${this.props.current_post.title}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          multiLine={true}
          rows={2}
          rowsMax={4}
          name="description"
          defaultValue={`${this.props.current_post.description}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          floatingLabelText="Condition"
          name="condition"
          defaultValue={`${this.props.current_post.condition}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          floatingLabelText="Location"
          name="location"
          defaultValue={`${this.props.current_post.location}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          floatingLabelText="Demand"
          name="demand"
          defaultValue={`${this.props.current_post.demand}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        {/* THIS MIGHT NEED TO BE CHANGED TO OUR FILEUPLOAD SYSTEM */}
        <TextField
          floatingLabelText="Photo URL"
          name="main_photo"
          defaultValue={`${this.props.current_post.main_photo}`}
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => this.submitEditPost()}
        />
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post
  };
}

export default connect(mapStateToProps)(EditPost);
