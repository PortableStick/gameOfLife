import React, {Component} from 'react';
import classnames from 'classnames';

class Square extends Component {
    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.activestate !== this.props.activestate) {
        return true;
      }
      return false;
    }

    // componentWillReceiveProps(nextProps) {
    //   console.log("Updating square", this.props.x, this.props.y);

    // }

    switchState() {
      let newState = this.props.activestate === "on" ? "off" : "on";
      this.props.toggle(this.props.x, this.props.y, newState);
    }

    render() {
      var squareClasses = classnames({
        'square': true,
        [`${this.props.activestate}`]: true
      });
      return (<div className={squareClasses} key={this.props.squareNum} onClick={this.switchState.bind(this)}></div>);
    }
}

export default Square;
