import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class Protected extends Component {
  componentDidMount() {
    try {
      const { exp } = jwtDecode(localStorage.token);
      if (exp < Math.floor(Date.now() / 1000)) {
        localStorage.clear();
        this.props.history.push('/login');
      }
    } catch (e) {
      console.log('error in Protected ', e);
      this.props.history.push('/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    console.log(this.props.component);
    return <Component {...this.props} />;
  }
}

export default Protected;
