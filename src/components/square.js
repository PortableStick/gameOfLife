import React, {Component} from 'react';
import classnames from 'classnames';

class Square extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activestate: this.props.activestate
      };
    }

    toggleActive(event) {
      event.stopPropagation();
      this.setState({
        activestate: this.state.activestate === "on" ? "off" : "on"
      })
    }

    render() {
      var squareClasses = classnames({
        'square': true,
        [`${this.state.activestate}`]: true
      });
      return (<span className={squareClasses} key={this.props.squareNum} onClick={this.toggleActive.bind(this)}></span>);
    }
}

export default Square;
