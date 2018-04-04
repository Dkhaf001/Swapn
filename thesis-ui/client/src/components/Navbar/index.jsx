import React, { Component } from 'react';
import Search from './Search.jsx';
import Categories from '../Category/Categories.jsx';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUserToStore, addCurrentPost } from '../../actions';
import StatusBar from './StatusBar.jsx';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ActionHome from 'material-ui/svg-icons/action/home';
import MapIcon from 'material-ui/svg-icons/maps/map';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    localStorage.clear();
    this.props.addActiveUserToStore('');
    this.props.addCurrentPost('');
  };
  loggedInView = () => (
    <header className="navbar" style={{ height: '150px' }}>
      <section className="navbar-section">
        <a href="/home" className="navbar-brand mr-2 text-light">
          <h2>
            <strong
              style={{
                paddingLeft: '20px',
                fontFamily: 'Megrim, cursive'
              }}
            >
              Swap'n
            </strong>
          </h2>
        </a>
      </section>
      <Search {...this.props} />
      <section className="navbar-section">
        <div className="btn btn-link">
          <Link to="/post" style={{ color: 'white' }}>
            <i className="icon icon-photo" /> Sell
          </Link>
        </div>
        <a href="/profile" className="btn btn-link">
          <strong style={{ color: 'white' }}>{localStorage.username}</strong>
        </a>
        <a
          href="/"
          className="btn btn-link"
          style={{ color: 'white' }}
          onClick={this.logout}
        >
          Logout
        </a>
        {localStorage.getItem('token') && (
          <Route path="/" component={StatusBar} />
        )}
      </section>
    </header>
  );
  // need to add logout functinoality and protection
  loggedOutView = () => (
    <header className="navbar" style={{ height: '150px' }}>
      <section className="navbar-section">
        <a href="/home" className="navbar-brand mr-2 text-light">
          <h2>
            <strong
              style={{
                paddingLeft: '20px',
                fontFamily: 'Megrim, cursive'
              }}
            >
              Swap'n
            </strong>
          </h2>
        </a>
      </section>
      <Search {...this.props} />
      <section className="navbar-section">
        <div className="btn btn-link">
          <Link to="/post" style={{ color: 'white' }}>
            <i className="icon icon-photo" /> Sell
          </Link>
        </div>
        <a href="/profile" className="btn btn-link">
          <strong style={{ color: 'white' }}>{localStorage.username}</strong>
        </a>
        <a href="/signup" className="btn btn-link" style={{ color: 'white' }}>
          Sign Up
        </a>
        <a href="/login" className="btn btn-link" style={{ color: 'white' }}>
          Login
        </a>
        {localStorage.getItem('token') && (
          <Route path="/" component={StatusBar} />
        )}
      </section>
    </header>
  );
  render() {
    return localStorage.token ? this.loggedInView() : this.loggedOutView();
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUserToStore
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
