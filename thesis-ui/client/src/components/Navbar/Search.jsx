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
      <section class="navbar-section">
        <div class="input-group input-inline">
          <input
            class="form-input"
            type="text"
            placeholder="search"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <button class="btn btn-primary input-group-btn" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list,
  };
}
export default connect(mapStateToProps)(Search);
