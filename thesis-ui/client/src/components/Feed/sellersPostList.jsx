import React, { Component } from 'react';
import { connect } from 'react-redux'
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class SellersPostList extends Component {
  constructor() {
    super();
  }
  async componentWillMount () {
    //grab data from db, update store
    try {
      let id = this.props.activeUser.userid;
      const { data } = await axios.get(`http://localhost:3396/api/posts/${id}`)
      this.props.addCurrentList(data);
    } catch(err) {
      console.log('err fetching posts', err)
    }
  };

  render() {
    return (
      <div>
      {this.props.current_list && this.props.current_list.map(item => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
     </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeUser: state.active_User,
    current_list: state.current_list
  }
}

export default connect(mapStateToProps)(SellersPostList);

