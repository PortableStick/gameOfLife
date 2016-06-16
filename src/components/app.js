import React, { Component } from 'react';
import Gameboard from './gameboard.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 50,
            height: 70
        }
        this.board = this.randomizeCells();
    }

    randomizeCells() {
        function cellData(x, y) {
            return {
                x: x,
                y: y,
                activestate: Math.floor(Math.random() * 4) < 3 ? "off" : "on"
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

    render() {
        return ( < div className = "container" >
            < Gameboard board = { this.board }
            width = { this.state.width }
            height = { this.state.height }
            toggle = { this.toggleActiveState }
            /> < /div>
        );
    }
}

export default App;
