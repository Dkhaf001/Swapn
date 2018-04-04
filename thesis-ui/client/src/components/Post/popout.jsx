import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Popout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: '',
    };
  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    if (this.state.offer) {
      console.log('in the popout', this.state.offer);
      const offer = this.state.offer;
      this.props.makeOffer(offer);
    }
  };
  handleInput(e) {
    this.setState({
      offer: e.target.value,
    });
  }
  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.offer.length <= 5}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Make Offer" onClick={this.handleOpen} />
        <Dialog title="Insert Offer" actions={actions} modal={true} open={this.state.open}>
          <input onChange={e => this.handleInput(e)} />
        </Dialog>
      </div>
    );
  }
}
