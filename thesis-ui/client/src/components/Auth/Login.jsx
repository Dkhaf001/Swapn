import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUserToStore } from '../../actions';

const { REST_SERVER_URL } = process.env;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  async handleSubmit() {
    try {
      const response = await axios.post(`${REST_SERVER_URL}/api/auth/login`, this.state);
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
    }
  }
  render() {
    return (
      <div>
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
          label="Log In"
          primary={true}
          style={{ margin: 12 }}
          onClick={() => this.handleSubmit()}
        />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUserToStore,
    },
    dispatch,
  );
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
