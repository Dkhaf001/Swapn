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
  componentWillMount() {
    console.log('shabi', this.props);
  }

  logout = () => {
    localStorage.clear();
    this.props.addActiveUserToStore('');
    this.props.addCurrentPost('');
  };
  loggedInView = () => (
    <header className="navbar">
      <section className="navbar-section">
        <a href="/home" className="navbar-brand mr-2 text-light">
          Swap'n
        </a>
        <div className="btn btn-link">
          <Categories {...this.props} />
        </div>
      </section>
      <Search {...this.props} />
      <section className="navbar-section">
        <a href="/profile" className="btn btn-link">
          {localStorage.username}
        </a>
        <div className="btn btn-link">
          <Link to="/post">Listing</Link>
        </div>
        <a href="/" className="btn btn-link" onClick={this.logout}>
          Logout
        </a>
        {localStorage.getItem('token') && (
          <div className="btn btn-link">
            <Route path="/" component={StatusBar} />
          </div>
        )}
      </section>
    </header>
  );
  // need to add logout functinoality and protection
  loggedOutView = () => (
    <header className="navbar">
      <section className="navbar-section">
        <a href="/home" className="navbar-brand mr-2">
          Swap'n
        </a>
        <div className="btn btn-link">
          <Categories {...this.props} />
        </div>
      </section>
      <Search {...this.props} />
      <section className="navbar-section">
        <a href="/profile" className="btn btn-link">
          {localStorage.username}
        </a>
        <div className="btn btn-link">
          <Link to="/post">Listing</Link>
        </div>
        <a href="/signup" className="btn btn-link">
          Signup
        </a>
        <a href="/login" className="btn btn-link">
          Login
        </a>
        {localStorage.getItem('token') && (
          <div className="btn btn-link">
            <Route path="/" component={StatusBar} />
          </div>
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
    active_user: state.active_user,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUserToStore,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
