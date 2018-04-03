import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Categories from './Categories.jsx';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: ''
    };
  }
  handleSubmit() {
    console.log('you aretryingto search ', this.state.name, this.props);
    this.props.history.push({
      pathname: '/search',
      state: this.state.name
    });
    location.reload();
  }
  render() {
    return (
      <section className="navbar-section">
        <div className="input-group input-inline">
          <Categories {...this.props} />
          <input
            className="form-input"
            type="text"
            placeholder="🔎  Search"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button
            className="btn btn-primary"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </button>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list
  };
}
export default connect(mapStateToProps)(Search);
