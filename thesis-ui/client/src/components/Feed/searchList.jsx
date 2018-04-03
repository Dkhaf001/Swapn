import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import { addSearchList } from '../../actions';
import { bindActionCreators } from 'redux';

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

class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      searching: '',
      list: '',
    };
  }

  componentWillMount = async () => {
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      const list = data.filter(result =>
        result.title.includes(this.props.location.state) ||
          result.description.includes(this.props.location.state));
      this.setState({
        list,
      });
      this.props.addSearchList(list);
    } catch (err) {
      console.log('Error on componentWillMount - homePostList');
    }
  };

  switchToSinglePost = async (post) => {
    try {
      this.props.addCurrentPost(post);
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('searchList switch', err);
    }
  };

  render() {
    return (
      <div>
        <h1>Search results for: {this.props.location.state}</h1>

        <div style={styles.root}>
          <GridList
            cellHeight={200}
            cols={4}
            padding={15}
            style={styles.gridList}
            style={{
              width: '80%',
              margin: '10 auto',
              // border: '2px solid rgb(11, 22, 241)',
              // backgroundColor: '#83d8ff',
            }}
          >
            {this.props.current_search &&
              this.props.current_search.map(post => (
                <GridTile
                  key={post.id}
                  title={post.title}
                  subtitle={
                    <div>
                      <span>
                        <b>{post.username}</b>
                      </span>
                      <br />
                      <span>
                        <b>{post.distance ? post.distance : null} miles away</b>
                      </span>
                    </div>
                  }
                  onClick={() => this.switchToSinglePost(post)}
                >
                  <img src={post.main_photo} />
                </GridTile>
              ))}
          </GridList>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_search: state.current_search,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addSearchList,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
