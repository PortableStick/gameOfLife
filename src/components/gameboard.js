import React, {Component, PropTypes} from 'react';
import Square from './square.js';

class GameBoard extends Component {

    constructor(props) {
      super(props);
      this.state = {
        boardSquares: this.setupGameBoard(props.board)
      };
    }

    setupGameBoard(board) {
      let boardSquares = [];
        board.forEach(row => {
          row.forEach(square => {
            boardSquares.push(<Square x={square.x} y={square.y} activestate={square.activestate} toggle={this.props.toggle} />)
          })
          boardSquares.push(<br />);
        })
      return boardSquares;
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        boardSquares: this.setupGameBoard(nextProps.board)
      });
    }

    render() {
      return (
        <div className="gameboard clearfix">
          {this.state.boardSquares}
        </div>)
    }
}

export default GameBoard;
