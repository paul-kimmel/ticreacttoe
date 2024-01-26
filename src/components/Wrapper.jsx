import { Component, createRef } from 'react';
import TicTacToe from './TicTacToe';

const gameRef = createRef();
export default class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  static playAsX() {
    gameRef.current.playAsX();
  }

  static playAsO() {
    gameRef.current.playAsO();
  }

  render() {
    
    return(
      <TicTacToe ref={gameRef}></TicTacToe>

    );
  }
}