import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';

// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class OtherPostList extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    //grab data from db, update store
    try {
      let username = this.props.activeUser.username;
      console.log('the id is', this.props.activeUser);
      const { data } = await axios.get(
        `http://localhost:3396/api/offers/${username}`
      );
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  render() {
    return (
      <div>
        {this.props.current_list &&
          this.props.current_list.map(item => {
            return <li key={item.id}>{JSON.stringify(item)}</li>;
          })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    postList: state.postList,
    activeUser: state.active_User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherPostList);
