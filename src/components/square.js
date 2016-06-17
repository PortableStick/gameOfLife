import React, {Component} from 'react';
import classnames from 'classnames';

class Square extends Component {
    constructor(props) {
      super(props);
      this.activestate = this.props.activestate;
    }

    shouldComponentUpdate(nextProps, nextState) {
      // if(nextProps.activestate !== this.props.activestate) {
      //   return true;
      // }
      return false;
    }

    componentWillReceiveProps(nextProps) {
      this.activestate = this.props.activestate;
    }

    switchState() {
      console.log(this.props);
      let newState = this.activestate === "on" ? "off" : "on";
      this.props.toggle(this.props.x, this.props.y, newState);
    }

    render() {
      var squareClasses = classnames({
        'square': true,
        [`${this.activestate}`]: true
      });
      return (<div className={squareClasses} id={`${this.props.x} ${this.props.y}`} key={this.props.squareNum} onClick={this.switchState.bind(this)}></div>);
    }
}

export default Square;
