import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const { REST_SERVER_URL } = process.env;
const options = [
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
      `${REST_SERVER_URL}/api/categories/${index}`
    );
    console.log('clicked! this is the data: ', data.rows);
    this.props.addCurrentList(data.rows);
  };

  render() {
    return (
      <div>
        <div
          className="btn btn-link"
          onClick={this.handleToggle}
          style={{ color: 'white' }}
        >
          Categories
        </div>
        {/* <FlatButton label="Categories" onClick={this.handleToggle} /> */}
        <Drawer
          docked={true}
          width={250}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          {options.map((category, i) => (
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleClick(i + 1);
              }}
              key={i}
            >
              {category}
            </MenuItem>
          ))}
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
