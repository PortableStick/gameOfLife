import React, { Component } from 'react';
import Gameboard from './gameboard.js';
import Controller from './controller.js';
import Controls from './controls.js';

const speedKey = {
  'FAST': 50,
  'MEDIUM': 110,
  'SLOW': 200
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 70,
            height: 50,
            gamespeed: speedKey['FAST']
        }
        this.board = this.populateSquares();
    }

    interval = 0;
    isRunning = false;
    generation = 0;
    squares = [];

    lifeCycle() {
      let board = this.board,
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

          for(let i = 0; i < 8; i++) {
            const neighbor = neighbors[i];
            if(neighbor && neighbor.activestate === "on") {
              neighborCount++;
            }
          }

          let newSquare = {x: currentSquare.x, y: currentSquare.y, activestate:""};

          if(neighborCount === 3 && currentSquare.activestate === "off") {
            newSquare.activestate = "on";
          } else if(neighborCount < 2) {
            newSquare.activestate = "off";
          } else if(neighborCount >= 4) {
            newSquare.activestate = "off";
          } else if(currentSquare.activestate === "on") {
            newSquare.activestate = "on";
          } else {
            newSquare.activestate = currentSquare.activestate;
          }
          copyOfBoard[i][j] = newSquare;
          this.toggleActiveState(newSquare.x, newSquare.y, newSquare.activestate)
        } //for-j
      }//for-i
      this.updateGeneration();
      this.board = copyOfBoard;
    }

    updateGeneration(newGen) {
      if(!arguments.length){this.generation++;}
      else{this.generation = newGen;}
      document.getElementById("counterNumber").innerHTML = this.generation;
    }

    randomizeCells() {

      if(this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        document.getElementById("pauseButton").innerHTML = "Start";
      }
      for(let i = 0; i < this.state.height; i++) {
        for(let j = 0; j < this.state.width; j++) {
          let randomState = (Math.random() * 7) < 1 ? "on" : "off";
          this.toggleActiveState(j, i, randomState);
        }
      }
      this.updateGeneration(0);
    }

    populateSquares() {
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


    clearSquares() {
      if(this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        document.getElementById("pauseButton").innerHTML = "Start";
      }
      for(let i = 0; i < this.state.height; i++) {
        for(let j = 0; j < this.state.width; j++) {
          this.toggleActiveState(j, i, "off");
        }
      }
      this.updateGeneration(0);
    }

    pause() {
      if(this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        document.getElementById("pauseButton").innerHTML = "Start";
      } else {
        this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
        this.isRunning = true;
        document.getElementById("pauseButton").innerHTML = "Pause";
      }
    }

    randomize() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.randomizeCells();
      this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
      this.isRunning = true;
      document.getElementById("pauseButton").innerHTML = "Pause";
      this.generation = 0;
    }

    toggleActiveState(x, y, activestate) {
      let currentSquare = `${x} ${y}`;
      this.board[y][x].activestate = activestate;
      document.getElementById(currentSquare).className = `square ${activestate}`
    }

    componentDidMount() {
      if(this.isRunning) {
        document.getElementById("pauseButton").innerHTML = "Pause";
      } else {
        document.getElementById("pauseButton").innerHTML = "Start";
      }
    }

    render() {
        return (
          <div className = "container" >
          <h1 className="title">Conway's Game of Life</h1>
            <Controller pause={this.pause.bind(this)} randomize={this.randomize.bind(this)} clear={this.clearSquares.bind(this)} />
            <Gameboard board = { this.board }
            toggle = { this.toggleActiveState.bind(this) } />
          </div>
        );
    }
}

export default App;
