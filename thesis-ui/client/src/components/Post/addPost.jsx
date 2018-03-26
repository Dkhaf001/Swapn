import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      newPost: {
        title: '',
        description: '',
        condition: '',
        location: '',
        demand: '',
        status: 'Accepting Offers'
      }
    };
  }

  submitNewPost = async () => {
    try {
      // UNCOMMENT THIS WHEN FINISHED --> THIS WILL REQUIRE FIELDS FOR SUBMISSION
      // if (
      //   this.state.newPost.title !== '' &&
      //   this.state.newPost.description !== '' &&
      //   this.state.newPost.condition !== '' &&
      //   this.state.newPost.location !== '' &&
      //   this.state.newPost.demand !== ''
      // ) {
      //   const userId = localStorage.id;
      //   await axios.post(
      //     `http://localhost:3396/api/posts/${userId}`,
      //     this.state.newPost
      //   );
      //   console.log('successfully submitted new post!');
      // } else {
      //   alert('Please fill out all text fields!');
      // }
      const userId = localStorage.id;
      await axios.post(
        `http://localhost:3396/api/posts/${userId}`,
        this.state.newPost
      );
      console.log('successfully submitted new post: ', this.state.newPost);
      this.props.history.push('/home');
    } catch (err) {
      console.log('error submitting new post!');
    }
  };

  handleChange = (event, index, value) => {
    this.setState({
      newPost: Object.assign({}, this.state.newPost, {
        condition: value
      })
    });
  };

  render() {
    return (
      <div>
        <h1>Make a Post!</h1>
        <TextField
          hintText="What are you selling?"
          floatingLabelText="Title"
          name="title"
          onChange={e => {
            this.setState({
              newPost: Object.assign({}, this.state.newPost, {
                [e.target.name]: e.target.value
              })
            });
          }}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          hintText="Add a brief description here!"
          multiLine={true}
          rows={2}
          rowsMax={4}
          name="description"
          onChange={e => {
            this.setState({
              newPost: Object.assign({}, this.state.newPost, {
                [e.target.name]: e.target.value
              })
            });
          }}
        />
        <br />
        Condition:{' '}
        <DropDownMenu
          value={this.state.newPost.condition}
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
          onChange={e => {
            this.setState({
              newPost: Object.assign({}, this.state.newPost, {
                [e.target.name]: e.target.value
              })
            });
          }}
        />
        <br />
        <TextField
          hintText="What do you want for your item?"
          floatingLabelText="Demand"
          name="demand"
          onChange={e => {
            this.setState({
              newPost: Object.assign({}, this.state.newPost, {
                [e.target.name]: e.target.value
              })
            });
          }}
        />
        <br />
        <RaisedButton
          label="Submit"
          primary={true}
          style={{ margin: 12 }}
          onClick={this.submitNewPost}
        />
        <br />
      </div>
    );
  }
}

export default AddPost;
