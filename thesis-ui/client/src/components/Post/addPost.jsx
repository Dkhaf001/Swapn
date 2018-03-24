import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
      status: 'Accepting Offers',
      main_photo: ''
    };
  }

  async submitNewPost() {
    try {
      // UNCOMMENT THIS WHEN FINISHED --> THIS WILL REQUIRE FIELDS FOR SUBMISSION
      // if (
      //   this.state.title !== '' &&
      //   this.state.description !== '' &&
      //   this.state.condition !== '' &&
      //   this.state.location !== '' &&
      //   this.state.demand !== ''
      // ) {
      //   const userId = localStorage.id;
      //   await axios.post(
      //     `http://localhost:3396/api/posts/${userId}`,
      //     this.state
      //   );
      //   console.log('successfully submitted new post!');
      // } else {
      //   alert('Please fill out all text fields!');
      // }

      const userId = localStorage.id;
      await axios.post(`http://localhost:3396/api/posts/${userId}`, this.state);
      console.log('successfully submitted new post: ', this.state);
      this.props.history.push('/home');
    } catch (err) {
      console.log('error submitting new post!');
    }
  }

  handleChange = (event, index, value) => this.setState({ condition: value });

  render() {
    return (
      <div>
        Make a Post!
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
        Condition:{' '}
        <DropDownMenu
          value={this.state.condition}
          onChange={this.handleChange}
          style={{ width: 300 }}
          autoWidth={true}
        >
          <MenuItem value="New (never used)" primaryText="New (never used)" />
          <MenuItem
            value="Reconditioned/Certified"
            primaryText="Reconditioned/Certified"
          />
          <MenuItem
            value="Open Box (never used)"
            primaryText="Open Box (never used)"
          />
          <MenuItem
            value="Used (normal wear)"
            primaryText="Used (normal wear)"
          />
          <MenuItem value="For Parts" primaryText="For Parts" />
          <MenuItem
            value="Other (see description)"
            primaryText="Other (see description)"
          />
        </DropDownMenu>
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
