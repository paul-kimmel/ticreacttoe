import React, { Component } from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';
export default class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">
        <div className="row">
          <Cell index={"[0, 0]"} cellValue={this.props.board[0][0]}></Cell>
          <Cell index={"[1, 0]"} cellValue={this.props.board[1][0]}></Cell>
          <Cell index={"[2, 0]"} cellValue={this.props.board[2][0]}></Cell>
        </div>
        <div className="row">
          <Cell index={"[0, 1]"} cellValue={this.props.board[0][1]}></Cell>
          <Cell index={"[1, 1]"} cellValue={this.props.board[1][1]}></Cell>
          <Cell index={"[2, 1]"} cellValue={this.props.board[2][1]}></Cell>
        </div>
        <div className="row">
          <Cell index={"[0, 2]"} cellValue={this.props.board[0][2]}></Cell>
          <Cell index={"[1, 2]"} cellValue={this.props.board[1][2]}></Cell>
          <Cell index={"[2, 2]"} cellValue={this.props.board[2][2]}></Cell>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array
}