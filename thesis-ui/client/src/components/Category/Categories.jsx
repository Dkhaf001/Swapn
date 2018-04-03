import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCategoryList, addCategoryName } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CategoryPost from '../Category/CategoryPost.jsx';

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
      open: false
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleClick = async (index, cat) => {
    const { data } = await axios.get(
      `http://localhost:3396/api/categories/${index}`
    );
    console.log('clicked! this is the data: ', data.rows);
    this.props.addCategoryList(data.rows);
    this.props.addCategoryName(cat);
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
                  this.props.history.push(`/categories/${category}`);
                }}
                key={i}
              >
                {category}
              </MenuItem>
            ))}
          </Drawer>
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
      addCategoryList,
      addCategoryName
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
