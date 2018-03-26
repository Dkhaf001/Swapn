import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


export default class Geolocation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fetchingPosition: false,
      position: undefined,
      error: undefined
    }
  }

  componentWillMount () {
    // if (typeof window !== 'object') {
    //   return
    // }

    // if (!('geolocation' in window.navigator)) {
    //   return
    // }

    // if (this.props.lazy) {
    //   return
    // }

    this.getCurrentPosition()
  }

  componentWillUnmount () {
    this.willUnmount = true
  }

  getCurrentPosition = () => {
    const {
      enableHighAccuracy,
      timeout,
      maximumAge,
      onSuccess,
      onError
    } = this.props

    this.setState({ fetchingPosition: true })

    return window.navigator.geolocation.getCurrentPosition(
      position => {
        if (this.willUnmount) return

        this.setState({ position, fetchingPosition: false }, () =>
          onSuccess(position)
        )
        console.log('position set to ', position)
      },
      err => {
        if (this.willUnmount) return

        this.setState({ err, fetchingPosition: false }, () => onError(err))
      },
      { enableHighAccuracy, timeout, maximumAge }
    )
  }

  render () {
    if (!this.props.render) {
      return null
    }
    return (
      this.props.render({
        getCurrentPosition: this.getCurrentPosition,
        fetchingPosition: this.state.fetchingPosition,
        position: this.state.position,
        error: this.state.error
      }) || null
    )
  }
}

Geolocation.propTypes = {
  // https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
  enableHighAccuracy: PropTypes.bool,
  timeout: PropTypes.number,
  maximumAge: PropTypes.number,
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  // Do not call getCurrentPosition on mount
  lazy: PropTypes.bool
}

Geolocation.defaultProps = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
  onSuccess: pos => {},
  // eslint-disable-next-line handle-callback-err
  onError: err => {},
  lazy: false
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list
  };
}

// export default connect(mapStateToProps)(Geolocation);
