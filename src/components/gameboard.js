import React, {Component, PropTypes} from 'react';
import Square from './square.js';

class GameBoard extends Component {

    constructor(props) {
      super(props);
    }

    static propTypes = {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      board: PropTypes.array.isRequired
    }

    render() {
      return (
        <div className="gameboard">
        </div>)
    }
}

export default GameBoard;
