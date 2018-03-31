import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCategoryList } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const categories = [
  'Antiques & Collectibles',
  'Appliances & Furniture',
  'Baby & Kids',
  'Beauty & Health',
  'Automotive',
  'Electronics, Computers & Office',
  'Clothing & Shoes',
  'Free',
  'Games & Toys',
  'Home, Garden & Tools',
  'Jewelry & Accessories',
  'Musical Instruments',
  'Pet Supplies',
  'Sports & Outdoors',
  'Tickets'
];

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
class Categories extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      currentCat: '',
      list: []
    };
  }

  componentWillMount() {}

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleClick = async (index, cat) => {
    const { data } = await axios.get(
      `http://localhost:3396/api/categories/${index}`
    );
    console.log('clicked! this is the data: ', data.rows);
    this.props.addCategoryList(data.rows);
    this.setState({
      currentCat: cat,
      list: data.rows
    });
  };

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
        <div style={{ textAlign: 'center' }}>
          <FlatButton label="Categories" onClick={this.handleToggle} />
          <Drawer
            docked={true}
            width={250}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            {categories.map((category, i) => (
              <MenuItem
                onClick={() => {
                  this.handleClose();
                  this.handleClick(i + 1, category);
                }}
                key={i}
              >
                {category}
              </MenuItem>
            ))}
          </Drawer>
        </div>
        <h1 style={{ textAlign: 'center' }}>{this.state.currentCat}</h1>
        <div style={styles.root}>
          <GridList cellHeight={200} style={styles.gridList}>
            {this.state.list &&
              this.state.list.map(post => (
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
    current_category: state.current_category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addCategoryList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
