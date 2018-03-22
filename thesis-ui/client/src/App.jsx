import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import { addDataToStore } from './actions';
import Chat from './components/Chat/Chat.jsx';
import Chattest from './components/Chat/Chattest.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';

import Rt from './routes/app.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  getRoute() {
    return this.props.location.pathname !== '/maps';
  }
  render() {
    return (
      <div>
        <Navbar />
        <div ref="mainPanel">
          <div>
            <Chattest />
            <Switch>
              {Rt.appRoutes.map((prop, key) => (
                <Route path={prop.path} component={prop.component} key={key} />
              ))}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dataFromReduxStorage: state.dataReducers,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addDataToStore,
    },
    dispatch,
  );
}

export default App;
