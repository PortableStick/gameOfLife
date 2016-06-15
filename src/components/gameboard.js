import React, {Component, PropTypes} from 'react';
import Row from './row.js';

class GameBoard extends Component {

    constructor(props) {
      super(props);
      this.boardSquares = this.setupGameBoard();
    }

    static propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }

    setupGameBoard() {
      let boardSquares = [];
      for(let i = 0; i < this.props.height; i++) {
        boardSquares.push(<Row width={this.props.width} key={`row-${i}`}/>)
      }
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
