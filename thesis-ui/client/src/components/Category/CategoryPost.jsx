import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

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

class CategoryPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.current_category
    };
  }

  // const url = window.location.href;
  // const postId = path.basename(url);

  switchToSinglePost = async post => {
    try {
      this.props.history.push(`/post/${post.id}`);
    } catch (err) {
      console.log('error with switchToSinglePost');
    }
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.props.category_name}</h1>
        <div style={styles.root}>
          <GridList cellHeight={200} style={styles.gridList}>
            {this.props.current_category &&
              this.props.current_category.map(post => (
                <GridTile
                  key={post.id}
                  title={post.title}
                  subtitle={
                    <span>
                      <b>{post.id}</b>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_category: state.current_category,
    category_name: state.category_name
  };
}

export default connect(mapStateToProps)(CategoryPost);
