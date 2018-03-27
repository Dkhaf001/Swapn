import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import PhotoUpload from '../Photo/index.jsx';

let tempPostId;

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      finished: false,
      stepIndex: 0,
      newPost: {
        title: '',
        description: '',
        condition: '',
        location: '',
        demand: '',
        status: 'Accepting Offers',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.submitNewPost = this.submitNewPost.bind(this);
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
      const { data } = await axios.post(
        `http://localhost:3396/api/posts/${userId}`,
        this.state.newPost,
      );
      tempPostId = data.rows[0].id;
      console.log('WILL IT WORK?', tempPostId);
      console.log('successfully submitted new post: ', this.state.newPost);
    } catch (err) {
      console.log('error submitting new post!');
    }
  };

  handleChange = (event, index, value) => {
    this.setState({
      newPost: Object.assign({}, this.state.newPost, {
        condition: value,
      }),
    });
  };

  handleNext() {
    const { stepIndex } = this.state;
    if (stepIndex === 0.5) {
      this.setState({ stepIndex: 1 });
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex === 0.5 || stepIndex === 1) {
      this.setState({ stepIndex: 0 });
    } else if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <h1>Make a Post!</h1>
            <TextField
              hintText="What are you selling?"
              floatingLabelText="Title"
              name="title"
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
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
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
            Condition:<br />
            <DropDownMenu
              value={this.state.newPost.condition}
              onChange={this.handleChange}
              style={{ width: 300 }}
              autoWidth={true}
            >
              <MenuItem value="New (never used)" primaryText="New (never used)" />
              <MenuItem value="Reconditioned/Certified" primaryText="Reconditioned/Certified" />
              <MenuItem value="Open Box (never used)" primaryText="Open Box (never used)" />
              <MenuItem value="Used (normal wear)" primaryText="Used (normal wear)" />
              <MenuItem value="For Parts" primaryText="For Parts" />
              <MenuItem value="Other (see description)" primaryText="Other (see description)" />
            </DropDownMenu>
            <br />
            <TextField
              hintText="Add Location Here"
              floatingLabelText="Location"
              name="location"
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
            <TextField
              hintText="What do you want for your item?"
              floatingLabelText="Demand"
              name="demand"
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
          </div>
        );
      case 1:
        // ELBERT! S3 GOES HERE!
        return <PhotoUpload />;
      // return 'OVER HERE ELBERT!!!!!!!!';
      case 2:
        return (
          <div>
            <h1>Confirm your post!</h1>
            <TextField
              floatingLabelText="Title"
              name="title"
              defaultValue={`${this.state.newPost.title}`}
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
            <TextField
              floatingLabelText="Description"
              multiLine={true}
              rows={2}
              rowsMax={4}
              name="description"
              defaultValue={`${this.state.newPost.description}`}
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
            Condition:<br />
            <DropDownMenu
              value={`${this.state.newPost.condition}`}
              onChange={this.handleChange}
              style={{ width: 300 }}
              autoWidth={true}
            >
              <MenuItem value="New (never used)" primaryText="New (never used)" />
              <MenuItem value="Reconditioned/Certified" primaryText="Reconditioned/Certified" />
              <MenuItem value="Open Box (never used)" primaryText="Open Box (never used)" />
              <MenuItem value="Used (normal wear)" primaryText="Used (normal wear)" />
              <MenuItem value="For Parts" primaryText="For Parts" />
              <MenuItem value="Other (see description)" primaryText="Other (see description)" />
            </DropDownMenu>
            <br />
            <TextField
              floatingLabelText="Location"
              name="location"
              defaultValue={`${this.state.newPost.location}`}
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
            <br />
            <TextField
              floatingLabelText="Demand"
              name="demand"
              defaultValue={`${this.state.newPost.demand}`}
              onChange={(e) => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value,
                  }),
                });
              }}
            />
          </div>
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };
    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Add Post Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Upload Photos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            this.props.history.push('/home')
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                {/* <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                /> */}
                {stepIndex === 0 ? (
                  <RaisedButton
                    label={'Next'}
                    primary={true}
                    onClick={() => {
                      this.handleNext();
                      this.submitNewPost();
                    }}
                  />
                ) : stepIndex === 2 ? (
                  <RaisedButton
                    label={'Finish'}
                    primary={true}
                    onClick={() => {
                      this.submitNewPost();
                    }}
                  />
                ) : (
                  <RaisedButton
                    label={'Next'}
                    primary={true}
                    onClick={() => {
                      this.handleNext();
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddPost;
