import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: 'San Francisco, CA' };
    this.onChange = address => this.setState({ address });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    };

    return (
      <form onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete
          inputProps={inputProps}
          onChange={(e) => {
            this.setState({
              newPost: Object.assign({}, this.state.newPost, {
                [e.target.name]: e.target.value,
              }),
            });
          }}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SimpleForm;
