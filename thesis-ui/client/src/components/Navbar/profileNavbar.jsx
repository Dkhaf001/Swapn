import React, { Component } from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfileNavbar extends Component {
  constructor() {
    super();
    this.state = {
      entries: ''
    };
  }
  async componentWillMount() {
    try {
      const obj = {};
      const messages = this.props.messages;
      if (messages) {
        for (let i = 0; i < messages.length; i++) {
          if (!obj[messages[i].roomId]) {
            obj[messages[i].roomId] = messages[i];
          }
        }
        const entries = Object.entries(obj);
        // console.log('this is the entries', entries);
        this.setState({
          entries
        });
      }
    } catch (err) {
      console.log('err profile navbar', err);
    }
  }
  render() {
    return (
      <div>
        {/* <div>{this.props.user ? `Current User: ${this.props.user}` : ''}</div> */}
        <div id="acceptedOffers text-center">
          {this.props.acceptedOffers ? (
            <div>
              {this.props.acceptedOffers.map(acceptedOffers => (
                <div key={acceptedOffers._id}>
                  {acceptedOffers.seller} accepted your offers on his posts{' '}
                  <Link to={`/post/${acceptedOffers.post_id}`}>
                    {acceptedOffers.title}
                  </Link>{' '}
                  please contact him as soon as possible
                </div>
              ))}
            </div>
          ) : (
            <div>No offer has been accepted</div>
          )}
        </div>
        <div id="notifications">
          {this.state.entries ? (
            this.state.entries.map(arr => (
              <div key={arr[0]}>
                {arr[1].from} says {arr[1].message} on post {arr[1].postTitle}
              </div>
            ))
          ) : (
            <div className="text-left">No Unread Messages</div>
          )}
        </div>
        <div>
          <ul className="tab tab-block">
            <li className="tab-item">
              <Link to="/profile/selling" className="linkbutton">
                Selling
              </Link>
            </li>
            <li className="tab-item">
              <Link to="/profile/bartering" className="linkbutton">
                Bartering
              </Link>
            </li>
            <li className="tab-item">
              <Link to="/profile/watchlist" className="linkbutton">
                Watchlist
              </Link>
            </li>
            <li className="tab-item">
              <Link to="/profile/following" className="linkbutton">
                Following
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    messages: state.messages,
    acceptedOffers: state.acceptedOffers
  };
}
export default connect(mapStateToProps)(ProfileNavbar);
