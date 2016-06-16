import React, {Component, PropTypes} from 'react';
import Row from './row.js';

class GameBoard extends Component {

    constructor(props) {
      super(props);
      this.boardSquares = this.setupGameBoard();
    }

    setupGameBoard() {
      let boardSquares = [];
      this.props.board.forEach((row, i) => {
        boardSquares.push(<Row rowData={row} toggle={this.props.toggle} key={i}/>)
      });
      return boardSquares;
    }

    render() {
      return (
        <div className="gameboard">
          {this.boardSquares}
        </div>)
    }
}

export default GameBoard;
