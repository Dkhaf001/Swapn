import React, { Component }from 'react';
import {
  Login,
  Signup,
  Search,
  Chat,
  Feed,
  Navbar,
  Post,
  Profile
} from './components'
// const App = () => <div>hello from App</div>;
class App extends Component {
  constructor(props){
    super(props)
    console.log('App', this.props)
  }
  render() {
    return (
      <div>
        <Login />
        <Signup />
        <Search />
        <Chat />
      </div>
    )
  }
}
export default App;
