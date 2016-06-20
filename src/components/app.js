import React, { Component } from 'react';
import Square from './square.js';
import Controller from './controller.js';
import Controls from './controls.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 40,
            height: 50,
            gamespeed: 50,
            generation: 0
        }
        this.state.board = this.clearCells();
    }

    interval = 0;
    isRunning = false;
    boardView = [];

    willLiveNextCycle() {
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
          } else if(currentSquare.activestate === "on"){
            newSquare.activestate = "on";
          } else {
            newSquare.activestate = currentSquare.activestate;
          }
          copyOfBoard[i][j] = newSquare;
        } //for-j
      }//for-i
      this.setState(previousState => {
        return {
          board: copyOfBoard,
          generation: previousState.generation + 1
        }
      });
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

    randomize() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.setState({
        board: this.randomizeCells(),
        generation: 0
      });
      this.interval = setInterval(this.willLiveNextCycle.bind(this), this.state.gamespeed);
      this.isRunning = true;
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

    clear() {
      clearInterval(this.interval);
      this.isRunning = false;
      this.setState({
        board: this.clearCells(),
        generation: 0
      });
    }

    pause() {
      if(this.isRunning) {
        clearInterval(this.interval);
        this.isRunning = false;
        this.forceUpdate();
      } else {
        this.interval = setInterval(this.willLiveNextCycle.bind(this), this.state.gamespeed);
        this.isRunning = true;
        this.forceUpdate();
      }
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
      });
      this.forceUpdate();
    }

    setSpeed(event) {
      this.setState({
        gamespeed: event.target.value
      });
      if(this.isRunning) {
        clearInterval(this.interval);
        this.interval = setInterval(this.willLiveNextCycle.bind(this), this.state.gamespeed);
      }
    }

    setupGameBoard(board) {
      let boardSquares = [];
        board.forEach(row => {
          row.forEach(square => {
            boardSquares.push(<Square x={square.x} y={square.y} activestate={square.activestate}/>);
          });
          boardSquares.push(<br />);
        });
      return boardSquares;
    }

    componentWillMount() {
      this.boardView = this.setupGameBoard(this.state.board);
    }

    render() {
        return (
          <div className = "container">
            <Controller pause={this.pause.bind(this)} randomize={this.randomize.bind(this)} clear={this.clear.bind(this)} pauseLabel={this.isRunning ? "Pause" : "Start"} generation={this.state.generation}/>
            <div className="gameboard">
              {this.state.board.map(row => {
                return (<div>
                  {row.map(square => {
                    return <Square x={square.x} y={square.y} activestate={square.activestate} toggle={this.manualInput.bind(this)}/>
                    })}
                  </div>)
              })}
            </div>
            <Controls setSpeed={this.setSpeed.bind(this)} value={this.gamespeed}/>
          </div>
        );
    }
}

export default App;
