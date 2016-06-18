import React, {Component} from 'react';
import classnames from 'classnames';

class Controller extends Component {
    render() {
      let pauseClasses = classnames({
        "btn": true,
        "btn-lg": true,
        [`${this.props.pauseLabel.toLowerCase()}`]: true
      });

      return(<div className="controller">
            <button className={pauseClasses} onClick={this.props.pause}>{this.props.pauseLabel}</button>
            <button className="btn btn-lg" onClick={this.props.clear}>Clear</button>
            <button className="btn btn-lg" onClick={this.props.randomize}>Randomize</button>
            <div className="counter">Generation: <span className="counterNumber" id="generationCounter">0</span></div>
        </div>);
    }
}

export default Controller;
