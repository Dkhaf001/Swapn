import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCategoryList } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import CategoryList from './categoryList.jsx';

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
class Categories extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  componentWillMount() {}

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleClick = async index => {
    const { data } = await axios.get(
      `http://localhost:3396/api/categories/${index}`
    );
    console.log('clicked! this is the data: ', data.rows);
    this.props.addCategoryList(data.rows);
  };

  render() {
    return (
      <div>
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
                this.handleClick(i + 1);
              }}
              key={i}
            >
              {category}
              {/* <CategoryList category={category} type={i + 1} /> */}
            </MenuItem>
          ))}
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category_list: state.category_list
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
