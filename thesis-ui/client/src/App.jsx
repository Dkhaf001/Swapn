// import React, { Component } from "react";
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect
// } from "react-router-dom";
// import View from "./components/View/view.jsx";
// import Navbar from "./components/Navbar/index.jsx";
// import { addDataToStore } from './actions'

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: ''
//     }
//   }
//   handleSubmit() {
//     this.props.addDataToStore(this.state.inputValue)
//   }
//   render() {
//     return (
//       <Router>
//         <div>
//           <Navbar />
//           <View />
//           <input type='text' onChange={(e) => this.setState({inputValue: e.target.value})} />
//           <input type='submit' onClick={()=>this.props.addDataToStore(this.state.inputValue)}/>
//           {this.props.dataFromReduxStorage}
//         </div>
//       </Router>
//     );
//   }
// }
// function mapStateToProps(state) {
//   return {
//     dataFromReduxStorage: state.dataReducers
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     addDataToStore
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import { addDataToStore } from './actions';

import { Switch, Route, Redirect } from 'react-router-dom';

import appRoutes from './routes/app.jsx';

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
            <Switch>
              {appRoutes.map((prop, key) => {
                if (prop.redirect) {
                  return <Redirect from={prop.path} to={prop.to} key={key} />;
                }
                return <Route path={prop.path} component={prop.component} key={key} />;
              })}
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
