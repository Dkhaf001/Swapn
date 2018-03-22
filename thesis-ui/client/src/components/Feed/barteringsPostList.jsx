import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

class BarteringsPostList extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    // grab data from db, update store
    try {
      const username = this.props.active_user.username;
      console.log('the username is', this.props.active_user);
      const { data } = await axios.get(`http://localhost:3396/api/offers/${username}`);
      this.props.addCurrentList(data);
      console.log('this is the current list from props', this.props.current_list);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.props.current_list &&
            this.props.current_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={e => console.log('Clicked post.id:', post.id)}
              >
                <img src={post.main_photo} />
              </GridTile>
            ))}
        </GridList>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list,
    active_user: state.active_user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentList,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BarteringsPostList);
