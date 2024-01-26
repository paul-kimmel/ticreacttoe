import React, { Component, createRef } from "react";
import Startup from './Startup';
import GameState from './GameState';
import Board from './Board';
import { outcomeSet, outcomes } from './outcomes';
import './TicTacToe.css';

export default class TicTacToe extends Component {

  static get Empty() {
    return "";
  }

  static get O() {
    return "O";
  }

  static get X() {
    return "X";
  }

  static get None() {
    return "None";
  }

  constructor(props) {
    super(props);
    this.startupRef = createRef();

    this.state = {
      playing: TicTacToe.None,
      startupClass: 'shown',
      gameClass: 'hidden',
      quitting: false,
      board: this.initialState()
    };
  }

  restart() {
    this.setState({
      playing: TicTacToe.None,
      startupClass: 'shown',
      gameClass: 'hidden',
      quitting: false,
      board: this.initialState()
    }, () => this.clearCanvas());

    
  }

  clearCanvas() {
    const canvas = document.getElementById('game-result');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  

  addMouseListener() {
    Array.from(document.getElementsByClassName("cell")).map(element => {
      element.addEventListener("mousedown", (event) => {
        event.stopImmediatePropagation();
        this.onMouseDown(event)
      })
    });

  }

  onMouseDown(event) {
    if (!this.isYourTurn()) return;

    console.log(event.target);
    try {
      let action = JSON.parse(event.currentTarget.getAttribute("data-action"));

      this.setState({
        board: this.result(this.getBoard(), action)
      }, () => this.playing());
    }
    catch (e) {
      console.log(e);
    }
  }

  isYourTurn() {
    return this.player(this.getBoard()) == this.state.playing;
  }


  addEventListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Q") {
        this.setState({
          quitting: true
        });
      }
    });

  }

  componentDidMount() {
    //this.lineDraw();
    this.addMouseListener();
    this.addEventListener();
    
  }


  playAsX() {
    this.setState({
      playing: "X",
      startupClass: 'hidden',
      gameClass: 'shown'
    });

  }

  playAsO() {
    this.setState({
      playing: "O",
      startupClass: 'hidden',
      gameClass: 'shown'
    }, () => this.playing());
  }

  getBoard() {
    return this.state.board;
  }

  playing() {
    console.log(`it is ${this.player(this.getBoard())}'s turn'`);

    const board = this.getBoard();

    if (this.player(this.getBoard()) !== this.state.playing && !this.terminal(board)) {

      let move = this.minimax(board);
      this.setState((previous, props) => ({
        board: this.result(previous.board, move)
      }));
      
    }
    
  }
  

  initialState() {
    return [[TicTacToe.Empty, TicTacToe.Empty, TicTacToe.Empty],
    [TicTacToe.Empty, TicTacToe.Empty, TicTacToe.Empty],
    [TicTacToe.Empty, TicTacToe.Empty, TicTacToe.Empty]];
  }

  player(board) {
    let count = 0;
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] == TicTacToe.Empty) {
          count += 1;
        }
      }
    }

    return count % 2 === 1 ? TicTacToe.X : TicTacToe.O;
  }

  actions(board) {
    let result = [];

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] === TicTacToe.Empty) {
          result.push([x, y]);
        }
      }
    }

    return result;
  }

  result(board, action) {

    let newBoard = JSON.parse(JSON.stringify(board));

    if (action === 'None') {
      return newBoard;
    }

    let p = this.player(newBoard);

    if (newBoard[action[0]][action[1]] !== TicTacToe.Empty) {
        throw new Error("Collision");
    }
   
    newBoard[action[0]][action[1]] = p;
    return newBoard;
  }

  rowWin(board, K) {
    for (let x = 0; x < board.length; x++) {
      if (board[x][0] === K && board[x][1] === K && board[x][2] === K) {
        return true;
      }
    }

    return false;
  }

  columnWin(board, K) {
    for (let y = 0; y < board.length; y++) {
      if (board[0][y] === K && board[1][y] === K && board[2][y] === K) {
        return true;
      }
    }

    return false;
  }

  leftTopWin(board, K) {
    return ((board[0][0] == K) && (board[1][1] == K) && (board[2][2] == K));
  }

  topRightWin(board, K) {
    return ((board[2][0] == K) && (board[1][1] == K) && (board[0][2] == K));
    
  }

  diagonalWin(board, K) { 
    return this.leftTopWin(board, K) || this.topRightWin(board, K);
  }

  inProgress(board) {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[0].length; y++) {
        if (board[x][y] === TicTacToe.Empty) {
          return true;
        }
      }
    }

    return false;
  }
    
  isWinner(board) {
    if (this.diagonalWin(board, TicTacToe.X) || this.rowWin(board, TicTacToe.X) || this.columnWin(board, TicTacToe.X)) {
      return TicTacToe.X;
    }

    if (this.diagonalWin(board, TicTacToe.O) || this.rowWin(board, TicTacToe.O) || this.columnWin(board, TicTacToe.O)) {
      return TicTacToe.O;
    }

    return TicTacToe.None;
  }

  winner(board) {
    return this.isWinner(board) !== TicTacToe.None;
  }

  terminal(board) {
    if (this.winner(board)) {
      
      return true;
    }

    if (this.inProgress(board) === false) {
      
      return true;
    }

    return false;
  }

  utility(board) {
    const P = this.isWinner(board);

    if (P === TicTacToe.X) {
      return 1;
    }

    if (P === TicTacToe.O) {
      return -1;
    }

    return 0;

  }

  minimax(board) {
    const currentPlayer = this.player(board);

    if (currentPlayer === TicTacToe.X) {
      const action = this.maxValue(board)[1];
      return action;
    }
    else {
      const action = this.minValue(board)[1];
      return action;
    }

  }

  maxValue(board) {
    if (this.terminal(board)) {
      return [this.utility(board), TicTacToe.None];
    }

    let v = Number.NEGATIVE_INFINITY;

    let bestAction = TicTacToe.None;

    this.actions(board).forEach(action => {
      let m = this.minValue(this.result(board, action));

      if (v < m[0]) {
        v = m[0];
        bestAction = action;
      }
      
    });

    return [v, bestAction];
  }

  minValue(board) {
    if (this.terminal(board)) {
      return [this.utility(board), TicTacToe.None];
    }

    let v = Number.POSITIVE_INFINITY;
    let bestAction = TicTacToe.None;

    this.actions(board).forEach(action => {
      let m = this.maxValue(this.result(board, action));

      if (v > m[0]) {
        v = m[0];
        bestAction = action;
      }
      
    });

    return [v, bestAction];
  }


  //stopped draw cats game on canvas C
  //writejest unit tests
  //split out winnertests so we could draw lines
  //test line drawing by intentionaly losing


  _lineDraw(k) {

    const canvas = document.getElementById('game-result');
    const context = canvas.getContext("2d");

    context.beginPath();
    context.moveTo(k.x, k.y);
    context.lineTo(k.x1, k.y1);
    context.stroke();
  }

  lineDraw(index) {
    


    this._lineDraw(outcomeSet.get(outcomes[index].name));


  }

  drawCat() {
    //corney

    const canvas = document.getElementById('game-result');
    const context = canvas.getContext("2d");
    
    const image = document.getElementById("cat");
    context.drawImage(image, 20, 20, 100, 100);
  }

  animateWinner(result) {

    if (this.leftTopWin(this.getBoard(), result)) {
      this.lineDraw(0);
    }
    else if (this.topRightWin(this.getBoard(), result)) {
      this.lineDraw(1);
    }
  }

  getMessage() {

    const board = this.getBoard();

    if (this.player(board) == this.state.playing && this.terminal(board) === false) {
      return `Playing as ${this.state.playing}`;
    }
    else if (this.terminal(board)) {

      const result = this.isWinner(board);
      if (result === TicTacToe.None) {
        //this.drawCat();
        return "Game Over: Tie";
      }
      else {
        this.animateWinner(result);
        return `Game Over: ${result} wins`;
      }
      
    }
    else {
      return "Computer is thinking...";
    }
  }

  canPlayAgain() {
    return this.terminal(this.getBoard()) ? 'shown' : 'hidden';
  }

  render() {

    return (
      <>
        <img src="src/assets/cat.gif" id="cat" style={{ display: "none" }} />
        <Startup dynamicClass={this.state.startupClass} ref={this.startupRef} ></Startup >
        <div className={`container tic-tac-toe ${this.state.gameClass}`} >
          <GameState message={this.getMessage()}></GameState>
          <canvas id="game-result" className="tictactoe-board">
          </canvas>
          <Board board={this.state.board}></Board>
          
          <div className="play-again">
            <button className={`${this.canPlayAgain()}`} onClick={() => this.restart()}>Play Again</button>
          </div>
        </div>
      </>
    );
  }

}