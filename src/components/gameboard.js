import React, {Component} from 'react';
import Square from './square.js';

class GameBoard extends Component {

    render() {
      return (
        <div className="gameboard container">
          <Square activestate="on" />
        </div>)
    }
}

export default GameBoard;
