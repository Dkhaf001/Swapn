import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// COMMENTS FROM ELBERT
//this is the component that will render when you want to add a post to the feed
// pop up?  or view change?
// photo upload to S3 is here and sends to
//iteration check
// this componet is rendered in when clickin add listing from profile page and listing button from nav bar
//

// COMMENTS FROM EDDIE
// Need to implement S3 when creating a post

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      condition: '',
      location: '',
      demand: '',
      status: '',
      main_photo: ''
    };
  }

  async submitNewPost() {
    try {
      const data = await axios.post(
        'http://localhost:3396/api/posts/',
        this.state
      );
      console.log('successfully submitted new post!');
    } catch (err) {
      console.log('error submitting new post!');
    }
  }

  render() {
    return (
      <div>
        Hello from Post
        <TextField
          hintText="What are you selling?"
          floatingLabelText="Title"
          name="title"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          hintText="Add a brief description here!"
          multiLine={true}
          rows={2}
          rowsMax={4}
          name="description"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          hintText="What is the condition of the item?"
          floatingLabelText="Condition"
          name="condition"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          hintText="Add Location Here"
          floatingLabelText="Location"
          name="location"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          hintText="What do you want for your item?"
          floatingLabelText="Demand"
          name="demand"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        {/* THIS MIGHT NEED TO BE CHANGED TO OUR FILEUPLOAD SYSTEM */}
        <TextField
          hintText="Enter photo URL"
          floatingLabelText="Photo URL"
          name="main_photo"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => this.submitNewPost()}
        />
        <br />
      </div>
    );
  }
}

export default AddPost;
