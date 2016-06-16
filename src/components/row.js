import React, {Component} from 'react';
import Square from './square.js';

class Row extends Component {
    constructor(props) {
      super(props);
      this.squares = this.setupRow();
    }

    setupRow() {
      let thisRow = [];
      this.props.rowData.forEach(squareData => {
        thisRow.push(<Square activestate={squareData.activestate} x={squareData.x} y={squareData.y} toggle={this.props.toggle}/>);
      })
      return thisRow;
    }
    render() {
      return(<div className="row">{this.squares}</div>);
    }
}

export default Row;
