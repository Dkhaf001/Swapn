import React, { Component } from 'react';
import { connect } from 'react-redux'


class BarteringsPostList extends Component {
  constructor() {
    super();
  }

  async componentWillMount () {
    //grab data from db, update store
    try {
      let id = this.props.activeUser.userid;
      console.log('the id is', this.props.activeUser);
      const { data } = await axios.get(`http://localhost:3396/api/offers/${id}`)
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
    postList: state.postList,
    activeUser: state.active_User
  }
}

export default connect(mapStateToProps)(BarteringsPostList);