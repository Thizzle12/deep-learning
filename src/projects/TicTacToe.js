import React, { Component } from 'react';
import ServerCalls from '../ServerCalls'
import './css/TicTacGame.css'

class TicTacToe extends Component {

  state={
    board: [0,0,0,0,0,0,0,0,0],
    winner: -1,
    winnerExists: false,
  }

  runABPrun = (idx) =>{
    if(!this.state.winnerExists && this.state.board[idx] === 0){
      var newBoard = this.state.board;
      newBoard[idx] = 2;
      var boardObject = {
        board : newBoard,
      }
      ServerCalls.sendTicTacToeMove(boardObject, this.updateBoard);
    }
  }

  updateBoard = (response) =>{
    console.log(response)
    this.setState({
      board : response.board,
      winner: response.winnerIs,
      winnerExists : response.winnerExists,
    })

  }

  resetBoard = () =>{
    this.setState({
      winner: -1,
      board: [0,0,0,0,0,0,0,0,0],
      winnerExists : false,
    })
  }

  redirect = (path) =>{
    this.props.history.push('/' + path);
  }

  render(){
    if(this.state.winnerExists !== false){
      alert("Winner is: " + this.state.winner)
    }
    return(
      <div>
      <div className="introduction">
        <div>
          <div className="home" onClick={() => this.redirect("")}>Home</div>
        </div>
        <h1 className="title">
          The Unbeatable TicTacToe game
        </h1>
        <div className="description">
          <p>This project shows the use of a MiniMax-algorithm with the use of alpha-beta pruning.</p>
          <p></p>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item" onClick={() => this.runABPrun(0)}>
          <h2>{this.state.board[0] !== 0 ? this.state.board[0] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(1)}>
          <h2>{this.state.board[1] !== 0 ? this.state.board[1] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(2)}>
          <h2>{this.state.board[2] !== 0 ? this.state.board[2] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(3)}>
          <h2>{this.state.board[3] !== 0 ? this.state.board[3] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(4)}>
          <h2>{this.state.board[4] !== 0 ? this.state.board[4] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(5)}>
          <h2>{this.state.board[5] !== 0 ? this.state.board[5] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(6)}>
          <h2>{this.state.board[6] !== 0 ? this.state.board[6] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(7)}>
          <h2>{this.state.board[7] !== 0 ? this.state.board[7] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>
        <div className="grid-item" onClick={() =>this.runABPrun(8)}>
          <h2>{this.state.board[8] !== 0 ? this.state.board[8] !== 2 ? 'O': 'X': <span></span>}</h2>
        </div>

      </div>
      <div id="resetButton" onClick={this.resetBoard}><a>Reset Board</a></div>
      </div>
    );

  }
}

export default TicTacToe;
