import React, {Component} from 'react';
import Square from './square.js';

class Row extends Component {
    constructor(props) {
      super(props);
      this.squares = this.setupRow();
    }

    setupRow() {
      let thisRow = [];
      for(let i = 0; i < this.props.width; i++) {
        thisRow.push(<Square activestate="off" key={`square-${i}`} />)
      }
      return thisRow;
    }
    render() {
      return(<div className="row">{this.squares}</div>);
    }
}

export default Row;
