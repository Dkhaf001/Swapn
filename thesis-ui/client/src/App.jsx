import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import View from './components/View/view.jsx';
import Navbar from './components/Navbar/index.jsx';
// const App = () => <div>hello from App</div>;
class App extends Component {
  constructor(props){
    super(props)
    console.log('App', this.props)
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar />
        <View />
      </div>
      </Router>
    )
  }
}
export default App;
