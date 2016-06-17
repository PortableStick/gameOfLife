import React, {Component} from 'react';

class Controller extends Component {
    render() {
      return(<div className="controller">
            <button className="btn btn-lg btn-primary" id="pauseButton" onClick={this.props.pause}>Pause</button>
            <button className="btn btn-lg btn-primary" onClick={this.props.clear}>Clear</button>
            <button className="btn btn-lg btn-primary" onClick={this.props.randomize}>Randomize</button>
            <span className="counter">Generation: <span id="counterNumber">{this.props.generation}</span></span>
        </div>);
    }
}

export default Controller;
