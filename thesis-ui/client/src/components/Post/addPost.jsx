import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import PhotoUpload from '../Photo/index.jsx';
import PhotoSlide from '../Photo/photoslide.jsx';
import {
  addCurrentPost,
  addNewPostId,
  addMainPhoto,
  addImages
} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Simpleform from '../Map/simpleForm.jsx';

const { REST_SERVER_URL } = process.env;
const { S3_SERVER_URL } = process.env;
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
        category: '',
        location: '',
        demand: '',
        status: 'Accepting Offers',
        main_photo: ''
      }
    };
    this.handleConditionChange = this.handleConditionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }
  componentWillMount() {
    // remove photos in s3 usning newPostID
    // clear newPostID / images / mainPhoto
    // on final submit clearn above too
    if (this.props.newPostId) {
      this.cancelPost(this.props.newPostId);
    }
    this.props.addNewPostId(null);
    this.props.addImages(null);
    this.props.addMainPhoto(null);
  }
  submitPost = async () => {
    try {
      if (
        this.state.newPost.title !== '' &&
        this.state.newPost.description !== '' &&
        this.state.newPost.condition !== '' &&
        this.state.newPost.category !== '' &&
        this.state.newPost.location !== '' &&
        this.state.newPost.demand !== ''
      ) {
        // const results = await geocodeByAddress(this.state.newPost.location);
        // const latLng = await getLatLng(results[0]);
        // this.setState({
        //   newPost: Object.assign({}, this.state.newPost, {
        //     location: latLng
        //   })
        // });
        const userId = localStorage.id;
        const postId = this.props.current_post.id;
        const { data } = await axios.put(
          `${REST_SERVER_URL}/api/posts/update/${userId}/${postId}`,
          this.state.newPost
        );
        tempPostId = data.rows[0].id;
        console.log(
          'successfully instantiated a new post (completed): ',
          this.state.newPost
        );
        this.props.history.push('/home');
      } else {
        alert('Please fill out all text fields!');
      }
      this.uploadImages();
      // clear local redux store
      this.props.addNewPostId(null);
      this.props.addImages(null);
      this.props.addMainPhoto(null);
    } catch (err) {
      console.log('error submitting new post!');
    }
  };
  uploadImages = async () => {
    try {
      const postId = this.props.newPostId;
      const imgs = this.props.images;
      imgs.forEach(async img => {
        const imgData = JSON.stringify(img);
        await axios.post(`${REST_SERVER_URL}/api/photos/${postId}`, {
          url: imgData
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  cancelPost = async () => {
    try {
      const userId = this.props.current_post.user_id;
      const postId = this.props.current_post.id;
      await axios.delete(`${REST_SERVER_URL}/api/posts/${userId}/${postId}`);

      await axios.delete(`${S3_SERVER_URL}/s3/api/${postId}`);

      console.log('successfully deleted new post');
      this.props.history.push('/home');
    } catch (err) {
      console.log('Error cancelling new post');
    }
  };

  cancelFirstPost = () => {
    this.props.history.push('/home');
  };

  handleConditionChange = (event, index, value) => {
    this.setState({
      newPost: Object.assign({}, this.state.newPost, {
        condition: value
      })
    });
  };

  handleCategoryChange = (event, index, value) => {
    this.setState({
      newPost: Object.assign({}, this.state.newPost, {
        category: value
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
        this.state.newPost.category !== '' &&
        this.state.newPost.location !== '' &&
        this.state.newPost.demand !== '' &&
        stepIndex === 0
      ) {
        const userId = localStorage.id;
        const { data } = await axios.post(
          `${REST_SERVER_URL}/api/posts/${userId}`,
          this.state.newPost
        );
        this.setState({ stepIndex: 1 });
        this.props.addCurrentPost(data.rows[0]);
        tempPostId = data.rows[0].id;

        // set
        this.props.addNewPostId(data.rows[0].id);

        console.log(
          'successfully submitted new post (pending): ',
          data.rows[0]
        );
      } else {
        this.handlePrev();
        alert('Please fill out all text fields!');
      }
    } catch (err) {
      console.log('Error handling first next button click');
      this.handlePrev();
    }
  };

  handleNext = async () => {
    try {
      // photo
      if (!this.props.main_photo) {
        this.setState({
          newPost: Object.assign({}, this.state.newPost, {
            main_photo: this.props.images[0].original
          })
        });
        this.props.addMainPhoto(this.props.images[0]);
      } else {
        this.setState({
          newPost: Object.assign({}, this.state.newPost, {
            main_photo: this.props.main_photo.original
          })
        });
      }
      // switch to next step
      const { stepIndex } = this.state;
      if (stepIndex === 0) {
        this.setState({ stepIndex: 1 });
      } else {
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2
        });
      }
    } catch (err) {
      console.log('handlenext addpost.jsx error:', err);
    }
    // make them choose photo before moving on
  };

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
              onChange={this.handleConditionChange}
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
            Category:<br />
            <DropDownMenu
              value={this.state.newPost.category}
              onChange={this.handleCategoryChange}
              style={{ width: 300 }}
              autoWidth={true}
            >
              <MenuItem value="1" primaryText="Antiques & Collectibles" />
              <MenuItem value="2" primaryText="Appliances & Furniture" />
              <MenuItem value="3" primaryText="Baby & Kids" />
              <MenuItem value="4" primaryText="Beauty & Health" />
              <MenuItem value="5" primaryText="Automotive" />
              <MenuItem
                value="6"
                primaryText="Electronics, Computers & Office"
              />
              <MenuItem value="7" primaryText="Clothing & Shoes" />
              <MenuItem value="8" primaryText="Free" />
              <MenuItem value="9" primaryText="Games & Toys" />
              <MenuItem value="10" primaryText="Home, Garden & Tools" />
              <MenuItem value="11" primaryText="Jewelry & Accessories" />
              <MenuItem value="12" primaryText="Musical Instruments" />
              <MenuItem value="13" primaryText="Pet Supplies" />
              <MenuItem value="14" primaryText="Sports & Outdoors" />
              <MenuItem value="15" primaryText="Tickets" />
            </DropDownMenu>
            <br />
            {/* <Simpleform /> */}
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
        return <PhotoUpload idPost={tempPostId} />;
      case 2:
        return (
          <div>
            <div>
              <PhotoSlide />
            </div>
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
              onChange={this.handleConditionChange}
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
            Category:<br />
            <DropDownMenu
              value={this.state.newPost.category}
              onChange={this.handleCategoryChange}
              style={{ width: 300 }}
              autoWidth={true}
            >
              <MenuItem value="1" primaryText="Antiques & Collectibles" />
              <MenuItem value="2" primaryText="Appliances & Furniture" />
              <MenuItem value="3" primaryText="Baby & Kids" />
              <MenuItem value="4" primaryText="Beauty & Health" />
              <MenuItem value="5" primaryText="Automotive" />
              <MenuItem
                value="6"
                primaryText="Electronics, Computers & Office"
              />
              <MenuItem value="7" primaryText="Clothing & Shoes" />
              <MenuItem value="8" primaryText="Free" />
              <MenuItem value="9" primaryText="Games & Toys" />
              <MenuItem value="10" primaryText="Home, Garden & Tools" />
              <MenuItem value="11" primaryText="Jewelry & Accessories" />
              <MenuItem value="12" primaryText="Musical Instruments" />
              <MenuItem value="13" primaryText="Pet Supplies" />
              <MenuItem value="14" primaryText="Sports & Outdoors" />
              <MenuItem value="15" primaryText="Tickets" />
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
              <div>{this.getStepContent(stepIndex)}</div>
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
    current_post: state.current_post,
    main_photo: state.main_photo,
    newPostId: state.newPostId,
    images: state.images
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addNewPostId,
      addImages,
      addMainPhoto
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
