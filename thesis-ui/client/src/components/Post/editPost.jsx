import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      condition: '',
      location: '',
      demand: '',
      status: 'Accepting Offers',
      main_photo: '',
    };
  }

  async componentWillMount() {
    this.setState({
      title: this.props.current_post.title,
      description: this.props.current_post.description,
      condition: this.props.current_post.condition,
      location: this.props.current_post.location,
      demand: this.props.current_post.demand,
      main_photo: this.props.current_post.main_photo,
    });
  }

  async submitEditPost() {
    try {
      const userId = this.props.current_post.user_id;
      console.log(this.props.current_post);
      const postId = this.props.current_post.id;
      const data = await axios.put(
        `http://localhost:3396/api/posts/update/${userId}/${postId}`,
        this.state,
      );
      console.log('successfully edited post!', this.state);
      this.props.history.push('/home');
    } catch (err) {
      console.log('error editing post');
    }
  }

  cancelEditPost = async () => {
    try {
      this.props.history.push('/home');
    } catch (err) {
      console.log('error canceling post on editPost');
    }
  };

  handleChange = (event, index, value) => this.setState({ condition: value });

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
        Condition:{' '}
        <DropDownMenu
          value={`${this.props.current_post.condition}`}
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
        <RaisedButton
          label="Cancel"
          secondary={true}
          style={{ margin: 12 }}
          onClick={() => this.cancelEditPost()}
        />
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_post: state.current_post,
  };
}

export default connect(mapStateToProps)(EditPost);
