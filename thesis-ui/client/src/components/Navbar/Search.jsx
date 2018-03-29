import React, { Component } from 'react';
import Categories from './Categories.jsx';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <Categories />
            <input type="text" placeholder="Search" />
            <input type="text" placeholder="Location" />
            <RaisedButton label="Submit" style={{ margin: 12 }} />
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
