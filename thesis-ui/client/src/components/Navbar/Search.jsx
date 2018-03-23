import React, { Component } from 'react';
// need two input feild standard search and location search button
// test
class Search extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" placeholder="Search" />
            <input type="text" placeholder="Location" />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
}
}
export default Search;
