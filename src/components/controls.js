import React, {Component} from 'react';

class Controls extends Component {

    render() {
      return(<div className="controls">
              <div className="speed">
                <input type="range" min={50} max={500} step={1} onChange={this.props.setSpeed} value={this.props.value}/>
              </div>
              </div>);
    }
}

export default Controls;
