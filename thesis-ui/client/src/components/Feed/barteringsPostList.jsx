import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCurrentPost, addBarteringList } from '../../actions';
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
    try {
      const username = localStorage.username;
      console.log('the username is', localStorage.username);
      const { data } = await axios.get(`http://localhost:3396/api/offers/${username}`);
      console.log('list', data);
      this.props.addBarteringList(data);
    } catch (err) {
      console.log('err fetching posts', err);
    }
  }

  switchToSinglePost = async (post) => {
    // console.log('!!!shayne::Clicked post.id:', post);
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.post_id}`);
    } catch (err) {
      console.log('barteringpostswitch', err);
    }
  };

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={200} style={styles.gridList}>
          {this.props.bartering_list &&
            this.props.bartering_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
                subtitle={
                  <span>
                    <b>{post.username}</b>
                  </span>
                }
                onClick={() => this.switchToSinglePost(post)}
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
    bartering_list: state.bartering_list,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCurrentPost,
      addBarteringList,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BarteringsPostList);
