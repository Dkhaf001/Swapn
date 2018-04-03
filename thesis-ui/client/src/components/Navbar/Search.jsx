import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
    };
  }
  handleSubmit() {
    console.log('you aretryingto search ', this.state.name, this.props);
    this.props.history.push({
      pathname: '/search',
      state: this.state.name,
    });
    location.reload();
  }
  render() {
    return (
      <div>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              onChange={e => this.setState({ location: e.target.value })}
            />
            <RaisedButton
              label="Submit"
              style={{ margin: 12 }}
              onClick={() => this.handleSubmit()}
            />
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list,
  };
}
export default connect(mapStateToProps)(Search);
