import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const { REST_SERVER_URL } = process.env;
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }
  async handleSubmit() {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/api/auth/signup`,
        this.state
      );
      this.props.history.push('/login');
    } catch (err) {
      console.log('err signup user', err);
    }
  }
  render() {
    return (
      <div className="form-group">
        <label className="form-label text-center" htmlFor="signup-email">
          <strong>Email</strong>
        </label>
        <input
          className="form-input centered"
          type="text"
          id="signup-name"
          name="email"
          placeholder="Enter Email"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          style={{ width: '50%' }}
        />
        <label className="form-label text-center" htmlFor="signup-name">
          <strong>Username</strong>
        </label>
        <input
          className="form-input centered"
          type="text"
          id="signup-name"
          name="username"
          placeholder="Enter Username"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          style={{ width: '50%' }}
        />
        <label className="form-label text-center" htmlFor="signup-password">
          <strong>Password</strong>
        </label>
        <input
          className="form-input centered"
          type="password"
          id="signup-password"
          name="password"
          placeholder="Enter Password"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          style={{ width: '50%' }}
        />
        <div>
          <br />
          <button
            className="btn btn-success centered"
            onClick={() => this.handleSubmit()}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
