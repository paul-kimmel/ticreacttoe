import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class GameState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2>{this.props.message}</h2>

    );
  }
}

GameState.propTypes = {
  message: PropTypes.string
}
