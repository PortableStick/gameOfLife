import React, {Component} from 'react';

class Controls extends Component {

    render() {
      return(<div className="controls">
              <div className="speed">
                <input type="range" value={3} step={1} />
              </div>
              </div>);
    }
}

export default Controls;
