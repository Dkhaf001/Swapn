import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }
  async handleSubmit() {
    try {
      const response = await axios.post('http://localhost:3396/api/auth/signup', this.state);
      this.props.history.push('/login');
    } catch (err) {
      console.log('err signup user', err);
    }
  }
  render() {
    return (
      <div>
        <TextField
          type="email"
          hintText="Enter Email"
          floatingLabelText="Email"
          name="email"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          hintText="Enter Username"
          floatingLabelText="Username"
          name="username"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <TextField
          hintText="Enter Password"
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
        />
        <br />
        <RaisedButton
          label="Sign Up"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => this.handleSubmit()}
        />
        <br />
      </div>
    );
  }
}

export default Signup;
