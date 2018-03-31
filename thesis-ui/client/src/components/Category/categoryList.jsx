import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategoryList } from '../../actions';
import axios from 'axios';

// this component will be used in the profile feed renders all users from following table
class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ''
    };
  }
  async componentWillMount() {
    try {
      console.log('this is the props', this.props);
      console.log('this is the props.category', this.props.category);
      console.log('this is the props.type', this.props.type);
    } catch (err) {
      console.log('err fetching followers');
    }
  }

  // switchToProfile = async userId => {
  //   try {
  //     this.props.history.push(`/othersprofile/${userId}`);
  //   } catch (err) {
  //     console.log('error switching to profile from CategoryListList');
  //   }
  // };

  // handleClick = async index => {
  //   const { data } = await axios.get(
  //     `http://localhost:3396/api/categories/${index}`
  //   );
  //   console.log('clicked! this is the data: ', data.rows);
  //   this.props.addCategoryList(data.rows);
  // };

  render() {
    return (
      <div>
        <div>{this.props.category}</div>
        {this.props.category_list}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category_list: state.category_list
  };
}

export default connect(mapStateToProps)(CategoryList);
