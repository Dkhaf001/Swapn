import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }
};

// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

class SellersPostList extends Component {
  constructor(props) {
    super(props);
  }
  async componentWillMount() {
    //grab data from db, update store
    try {
      let id = this.props.active_user.id;
      const { data } = await axios.get(`http://localhost:3396/api/posts/${id}`);
      this.props.addCurrentList(data);
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
    active_user: state.active_user,
    current_list: state.current_list
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

export default connect(mapStateToProps, mapDispatchToProps)(SellersPostList);
