import React, { Component } from 'react';
import Gameboard from './gameboard.js';
import Controller from './controller.js';

const speedKey = {
  'FAST': 200,
  'MEDIUM': 500,
  'SLOW': 1000
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 70,
            height: 50,
            gamespeed: speedKey['MEDIUM']
        }
        this.state.board = this.clearCells();
    }

    interval = 0;
    isRunning = false;

    lifeCycle() {
      let board = this.state.board,
          copyOfBoard = [],
          height = this.state.height,
          width = this.state.width;
      for(let i = 0; i < height; i++) {
        let currentRow = board[i];
        copyOfBoard.push([]);
        for(let j = 0; j < width; j++) {
          let currentSquare = currentRow[j],
              neighborLeft = j > 0 ? currentRow[j - 1] : null,
              neighborRight = j < (width - 1) ? currentRow[j + 1] : null,
              neighborUp = i > 0 ? board[i - 1][j] : null,
              neighborDown = i < (height - 1) ? board[i + 1][j] : null,
              neighborTopLeft = (i > 0 && j > 0) ? board[i - 1][j - 1] : null,
              neighborTopRight = (i > 0 && j < (width - 1)) ? board[i - 1][j + 1] : null,
              neighborBottomLeft = (i < (height - 1) && j > 0) ? board[i + 1][j - 1] : null,
              neighborBottomRight = (i < (height - 1) && j < (width - 1)) ? board[i + 1][j + 1] : null,
              neighbors = [neighborLeft, neighborRight, neighborUp, neighborDown, neighborTopLeft, neighborTopRight, neighborBottomLeft, neighborBottomRight],
              neighborCount = 0;

          neighbors.forEach(neighbor => {
            if(neighbor && neighbor.activestate === "on") {
              neighborCount++;
            }
          });
          let newSquare = {x: currentSquare.x, y: currentSquare.y, activestate:""};
          if(neighborCount === 3 && currentSquare.activestate === "off") {
            newSquare.activestate = "on";
          } else if(neighborCount < 2) {
            newSquare.activestate = "off";
          } else if(neighborCount >= 4) {
            newSquare.activestate = "off";
          } else {
            newSquare.activestate = "on";
          }
          copyOfBoard[i][j] = newSquare;
        } //for-j
      }//for-i
      this.setState({
        board: copyOfBoard
      });
    }

    componentDidMount() {
      // this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
    }

    randomizeCells() {
        function cellData(x, y) {
            return {
                x: x,
                y: y,
                activestate: (Math.random() * 10) < 1 ? "on" : "off"
            }
        }
        let boardData = [];
        for (let i = 0; i < this.state.height; i++) {
            let subarray = [];
            for (let j = 0; j < this.state.width; j++) {
                subarray.push(cellData(j, i));
            }
            boardData.push(subarray);
        }
        return boardData;
    }

    clearCells() {
      function cellData(x, y) {
            return {
                x: x,
                y: y,
                activestate: "off"
            }
        }
        let boardData = [];
        for (let i = 0; i < this.state.height; i++) {
            let subarray = [];
            for (let j = 0; j < this.state.width; j++) {
                subarray.push(cellData(j, i));
            }
            boardData.push(subarray);
        }
        return boardData;
    }

    pause() {
      if(this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        this.forceUpdate();
      } else {
        this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
        this.isRunning = true;
        this.forceUpdate();
      }
    }

    randomize() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.setState({
        board: this.randomizeCells()
      });
      this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
      this.isRunning = true;
    }

    clear() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.setState({
        board: this.clearCells()
      });
    }

    manualInput(x, y, activestate) {
      let board = this.state.board;
      board[y][x] = {
        x: x,
        y: y,
        activestate: activestate
      };
      this.setState({
        board: board
      })
      this.forceUpdate();
    }

    render() {
        return (
          <div className = "container" >
            <Controller pause={this.pause.bind(this)} randomize={this.randomize.bind(this)} clear={this.clear.bind(this)} pauseLabel={this.isRunning ? "Pause" : "Start"} />
            <Gameboard board = { this.state.board }
            toggle = { this.manualInput.bind(this) } />
          </div>
        );
    }
}

export default App;
