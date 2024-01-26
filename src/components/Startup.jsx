
/* eslint-disable react/display-name */
import { Component } from 'react';
import Wrapper from './Wrapper'; 
import PropTypes from 'prop-types';

import './Startup.css';

export default class Startup extends Component {
  constructor(props) {
    super(props);

    this.playAsX = this.playAsX.bind(this);
    this.playAsO = this.playAsO.bind(this);
  }

  playAsX() {
    Wrapper.playAsX();
  }

  playAsO() {
    Wrapper.playAsO();
  }


  render() {
    return (
      // eslint-disable-next-line react/prop-types
      <div className={`container ${this.props.dynamicClass}`}>
        <h1>Play Tic-Tac-Toe</h1>
        <button onClick={() => this.playAsX()}>Play as X</button>
          <button onClick={() => this.playAsO()}>Play as O</button>
      </div>
    );
  }
}

Startup.propTypes = {
  dynamicClass: PropTypes.string
}