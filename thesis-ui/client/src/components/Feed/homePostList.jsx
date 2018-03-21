import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addCurrentList } from '../../actions';
import { bindActionCreators } from 'redux';
// post list will need to render all post for all feeds by rendering stuff from store
// best to have three way conditional rendered views due to styling
// main feed,
//watching feed, barttering feed
// selling list --> needs aditional button to create listing and delete listings and render if it was bartered or not

// eddie's edits
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
//

class HomePostList extends Component {
  constructor() {
    super();
  }

  async componentWillMount() {
    //grab data from db, update store
    try {
      const { data } = await axios.get('http://localhost:3396/api/posts');
      this.props.addCurrentList(data);
    } catch (err) {
      console.log('err fetching posts');
    }
  }

  plsWork() {
     <div style={styles.root}>
        <GridList cellHeight={180} style={styles.gridList}>
          <Subheader>Here is your feed!</Subheader>
          {this.props.current_list &&
            this.props.current_list.map(post => (
              <GridTile
                key={post.id}
                title={post.title}
              >
                <img src={post.main_photo} />
              </GridTile>
            ))}
        </GridList>
      </div>
  }

  render() {
    return (
 
      <div>{this.plsWork()}</div>
      // <div>
      //   {this.props.current_list &&
      //     this.props.current_list.map(post => (
      //       <li>
      //         key={post.id}
      //         title={post.title}
      //         img={post.main_photo}
      //       </li>
      //     ))}
      // </div>

      // <div>
      //   {this.props.current_list &&
      //     this.props.current_list.map(item => {
      //       return (
      //         <div>
      //           id:{item.id}
      //           title:{item.title}
      //           img:{item.main_photo}
      //         </div>)
      //     })}
      // </div>

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
      addCurrentList: addCurrentList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePostList);
