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
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

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

  componentWillMount() {
    console.log('this is props', this.props);
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
      <div className="homepost">
        <h2 style={{ textAlign: 'center' }}>{this.props.category_name}</h2>
        <div className="containerr">
          <div className="columnss">
            {this.props.current_category &&
              this.props.current_category
                .filter(post => post.status !== 'SWAPPED')
                .map(post => (
                  <div
                    className="card"
                    key={post.id}
                    onClick={() => this.switchToSinglePost(post)}
                  >
                    <div className="card-image centered">
                      <img src={post.main_photo} className="img-responsive" />
                      <div className="overlay">
                        <div className="overlaytext">
                          <strong>Description: </strong>
                          <br />
                          {post.description}
                          <Chip
                            style={{
                              margin: 'auto',
                              width: '100%',
                              bottom: '0',
                              position: 'absolute',
                              backgroundColor: 'rgb(208, 204, 208)'
                            }}
                            onClick={e => {
                              e.stopPropagation();
                              this.switchToSinglePost(post);
                            }}
                          >
                            <Avatar src={post.photo_url} />
                            <div
                              style={{ color: '#3a606e', fontWeight: 'bold' }}
                            >
                              {post.username}
                            </div>
                          </Chip>
                        </div>
                      </div>
                    </div>
                    <div className="bottomhalf">
                      <div className="card-header centered">
                        <div className="card-title h5 centered">
                          {post.title}
                        </div>
                        <div className="card-subtitle centered">
                          {post.distance ? post.distance : null} miles away
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
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
