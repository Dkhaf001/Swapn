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
    <header class="navbar">
      <section class="navbar-section">
        <a href="/home" class="navbar-brand mr-2">
          Swap'n
        </a>
        <div class="btn btn-link">
          <Categories {...this.props} />
        </div>
      </section>
      <Search {...this.props} />
      <section class="navbar-section">
        <div class="btn btn-link">
          <Link to="/post">Listing</Link>
        </div>
        <a href="/profile" class="btn btn-link">
          {localStorage.username}
        </a>
        {localStorage.getItem('token') && (
          <div className="rightbanner">
            <Route path="/" component={StatusBar} />
          </div>
        )}
        <a href="/" class="btn btn-link" onClick={this.logout}>
          Logout
        </a>
      </section>
    </header>
    // <div className="rowbanner">
    //   <div className="middlebanner">
    //     Currently Signed in as : {localStorage.username}
    //     <Search {...this.props} />
    //     {/* <Link to="/categories" className="linkbutton">
    //       Categories
    //     </Link> */}
    //     <Categories {...this.props} />
    //     <Link to="/post" className="linkbutton">
    //       Listing
    //     </Link>
    //     <Link to="/profile" className="linkbutton">
    //       Profile
    //     </Link>
    //     <Link to="/" onClick={this.logout} className="linkbutton">
    //       Logout
    //     </Link>
    //   </div>
    //   {localStorage.getItem('token') && (
    //     <div className="rightbanner">
    //       <Route path="/" component={StatusBar} />
    //     </div>
    //   )}
    //   <div className="leftbanner">
    //     <IconButton
    //       className="svg_icons"
    //       containerElement={<Link to="/home" />}
    //     >
    //       <ActionHome />
    //     </IconButton>
    //     {/* <IconButton className="svg_icons" containerElement={<Link to="/maps" />}>
    //       <MapIcon />
    //     </IconButton> */}
    //   </div>
    // </div>
  );
  // need to add logout functinoality and protection
  loggedOutView = () => (
    <div className="rowbanner">
      <div className="middlebanner">
        <Search {...this.props} />
        {/* <Link to="/categories" className="linkbutton">
          Categories
        </Link> */}
        <Categories {...this.props} />
        <Link to="/signup" className="linkbutton">
          SignUp
        </Link>
        <Link to="/login" className="linkbutton">
          Login
        </Link>
      </div>
      {localStorage.getItem('token') && (
        <div className="rightbanner">
          <Route path="/" component={StatusBar} />
        </div>
      )}
      <div className="leftbanner">
        <IconButton className="svg_icons" containerElement={<Link to="/home" />}>
          <ActionHome />
        </IconButton>
        {/* <IconButton className="svg_icons" containerElement={<Link to="/maps" />}>
          <MapIcon />
        </IconButton> */}
      </div>
    </div>
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
