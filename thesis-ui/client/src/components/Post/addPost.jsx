import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import PhotoUpload from '../Photo/index.jsx';
import { addCurrentPost } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        status: 'Accepting Offers'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }

  submitPost = async () => {
    try {
      if (
        this.state.newPost.title !== '' &&
        this.state.newPost.description !== '' &&
        this.state.newPost.condition !== '' &&
        this.state.newPost.location !== '' &&
        this.state.newPost.demand !== ''
      ) {
        const userId = localStorage.id;
        const { data } = await axios.put(
          `http://localhost:3396/api/posts/${userId}`,
          this.state.newPost
        );
        tempPostId = data.rows[0].id;
        console.log('successfully submitted new post: ', this.state.newPost);
      } else {
        alert('Please fill out all text fields!');
      }
    } catch (err) {
      console.log('error submitting new post!');
    }
  };

  cancelPost = async () => {
    try {
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      await axios.delete(`http://localhost:3396/api/posts/${userId}/${postId}`);
      // ============================================
      // need to implement logic for delete from S3
      // OVER HERE ELBERT!
      // ============================================
      console.log('successfully deleted new post');
      this.props.history.push('/home');
    } catch (err) {
      console.log('Error cancelling new post');
    }
  };

  cancelFirstPost = () => {
    this.props.history.push('/home');
  };

  handleChange = (event, index, value) => {
    this.setState({
      newPost: Object.assign({}, this.state.newPost, {
        condition: value
      })
    });
  };

  handleFirstNext = async () => {
    try {
      const { stepIndex } = this.state;
      if (
        this.state.newPost.title !== '' &&
        this.state.newPost.description !== '' &&
        this.state.newPost.condition !== '' &&
        this.state.newPost.location !== '' &&
        this.state.newPost.demand !== '' &&
        stepIndex === 0
      ) {
        const userId = localStorage.id;
        const { data } = await axios.post(
          `http://localhost:3396/api/posts/${userId}`,
          this.state.newPost
        );
        this.setState({ stepIndex: 1 });
        this.props.addCurrentPost(data.rows[0]);
        tempPostId = data.rows[0].id;
        console.log('successfully submitted new post: ', data.rows[0]);
      } else {
        this.handlePrev();
        alert('Please fill out all text fields!');
      }
    } catch (err) {
      console.log('Error handling first next button click');
    }
  };

  handleNext() {
    const { stepIndex } = this.state;
    if (stepIndex === 0) {
      this.setState({ stepIndex: 1 });
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });
    }
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex === 1) {
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
            Condition:<br />
            <DropDownMenu
              value={this.state.newPost.condition}
              onChange={this.handleChange}
              style={{ width: 300 }}
              autoWidth={true}
            >
              <MenuItem
                value="New (never used)"
                primaryText="New (never used)"
              />
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
              multiLine={true}
              rows={2}
              rowsMax={4}
              name="description"
              defaultValue={`${this.state.newPost.description}`}
              onChange={e => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value
                  })
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
              <MenuItem
                value="New (never used)"
                primaryText="New (never used)"
              />
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
              floatingLabelText="Location"
              name="location"
              defaultValue={`${this.state.newPost.location}`}
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
              floatingLabelText="Demand"
              name="demand"
              defaultValue={`${this.state.newPost.demand}`}
              onChange={e => {
                this.setState({
                  newPost: Object.assign({}, this.state.newPost, {
                    [e.target.name]: e.target.value
                  })
                });
              }}
            />
          </div>
        );
      default:
        return 'Step right up!';
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
                {stepIndex === 0 ? (
                  <RaisedButton
                    label={'Next'}
                    primary={true}
                    onClick={() => {
                      this.handleFirstNext();
                    }}
                  />
                ) : stepIndex === 2 ? (
                  <RaisedButton
                    label={'Finish'}
                    primary={true}
                    onClick={() => {
                      this.submitPost();
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
                {stepIndex === 0 ? (
                  <RaisedButton
                    label={'Cancel'}
                    secondary={true}
                    onClick={() => {
                      this.cancelFirstPost();
                    }}
                  />
                ) : (
                  <RaisedButton
                    label={'Cancel'}
                    secondary={true}
                    onClick={() => {
                      this.cancelPost();
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

function mapStateToProps(state) {
  return {
    current_post: state.current_post
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
