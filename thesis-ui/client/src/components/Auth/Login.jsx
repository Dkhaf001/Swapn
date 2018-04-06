import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUserToStore } from '../../actions';

const REST_SERVER_URL = process.env.REST_SERVER_URL;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      err: ''
    };
  }
  async handleSubmit() {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/api/auth/login`,
        this.state
      );
      // window.localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token.accessToken);
      localStorage.removeItem('randid');
      // response.data.token = null;
      this.props.addActiveUserToStore(response.data);
      this.props.history.push('/home');
    } catch (err) {
      console.log('err loging', err);
      this.setState({
        err: true
      });
    }
  }

  enterLogin = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="form-group">
        {this.state.err && (
          <div
            className="toast toast-error centered"
            style={{ textAlign: 'center', width: '50%' }}
          >
            Something went wrong. Please try again!
          </div>
        )}
        <label className="form-label text-center" htmlFor="login-name">
          <strong>Username</strong>
        </label>
        <input
          className="form-input centered"
          type="text"
          id="login-name"
          name="username"
          placeholder="Enter Username"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          style={{ width: '30%' }}
        />
        <label className="form-label text-center" htmlFor="login-password">
          <strong>Password</strong>
        </label>
        <input
          className="form-input centered"
          type="password"
          id="login-password"
          name="password"
          placeholder="Enter Password"
          onChange={e => this.setState({ [e.target.name]: e.target.value })}
          style={{ width: '30%' }}
          onKeyUp={e => this.enterLogin(e)}
        />
        <div>
          <br />
          <button
            className="btn btn-success centered"
            onClick={() => this.handleSubmit()}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUserToStore
    },
    dispatch
  );
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
