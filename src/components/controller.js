import React, {Component} from 'react';

class Controller extends Component {
    render() {
      return(<div className="controller">
            <button className="btn btn-lg btn-primary" onClick={this.props.pause}>{this.props.pauseLabel}</button>
            <button className="btn btn-lg btn-primary" onClick={this.props.randomize}>Randomize</button>
        </div>);
    }
}

export default Controller;
