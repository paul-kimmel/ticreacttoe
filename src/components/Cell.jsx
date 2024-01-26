import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="cell" data-action={this.props.index} id="cell-0">{this.props.cellValue}</div>
    )
  }
}


Cell.propTypes = {
  index: PropTypes.string,
  cellValue: PropTypes.string
}