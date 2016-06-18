import React, { Component } from 'react';
import Square from './square.js';
import Controller from './controller.js';
import Controls from './controls.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 40,
            height: 40,
            gamespeed: 50
        }
        this.state.board = this.clearCells();
        this.generation = 0;
    }

    interval = 0;
    isRunning = false;
    boardView = [];

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

          for(let k = 0; k < 8; k++) {
            let neighbor = neighbors[k];
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
          } else if(currentSquare.activestate === "on"){
            newSquare.activestate = "on";
          } else {
            newSquare.activestate = currentSquare.activestate;
          }
          copyOfBoard[i][j] = newSquare;
          this.updateSquare(j, i, newSquare.activestate);
        } //for-j
      }//for-i
      this.updateGeneration();
      this.setState((previousState) => {
        return {
          board: copyOfBoard
        }
      });
    }

    updateGeneration(newGen) {
      if(!arguments.length) {
        this.generation = this.generation + 1;
        this.generationCounter.innerHTML = this.generation;
      } else {
        this.generation = this.generationCounter = newGen;
      }
    }

    randomizeCells() {
        function cellData(x, y) {
            return {
                x: x,
                y: y,
                activestate: (Math.random() * 6) < 1 ? "on" : "off"
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
        board: this.randomizeCells(),
        generation: 0
      });
      this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
      this.isRunning = true;
    }

    clear() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.setState({
        board: this.clearCells(),
        generation: 0
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
      this.updateSquare(x, y, activestate);
      this.forceUpdate();
    }

    setSpeed(event) {
      this.setState({
        gamespeed: event.target.value
      });
      clearInterval(this.interval);
      if(this.isRunning) {
        this.interval = setInterval(this.lifeCycle.bind(this), this.state.gamespeed);
      }
    }

    setupGameBoard(board) {
      let boardSquares = [];
        board.forEach(row => {
          row.forEach(square => {
            boardSquares.push(<Square x={square.x} y={square.y} activestate={square.activestate} toggle={this.updateSquare.bind(this)}/>)
          })
          boardSquares.push(<br />);
        })
      return boardSquares;
    }

    updateSquare(x, y, activestate) {
      document.getElementById(`${x} ${y}`).className = `square ${activestate}`;
    }

    componentWillMount() {
      this.boardView = this.setupGameBoard(this.state.board);
    }

    componentDidMount() {
      this.generationCounter = document.getElementById('generationCounter');
    }

    render() {
        return (
          <div className = "container" >
            <Controller pause={this.pause.bind(this)} randomize={this.randomize.bind(this)} clear={this.clear.bind(this)} pauseLabel={this.isRunning ? "Pause" : "Start"}/>
            <div className="gameboard">
              {this.boardView}
            </div>
            <Controls setSpeed={this.setSpeed.bind(this)} value={this.gamespeed}/>
          </div>
        );
    }
}

export default App;
