import React, {Component} from 'react';
import classnames from 'classnames';

class Square extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activestate: this.props.activestate
      };
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.activestate === this.props.activestate) {
        return true;
      }
      return false;
    }

    render() {
      var squareClasses = classnames({
        'square': true,
        [`${this.props.activestate}`]: true
      });
      return (<div className={squareClasses} key={this.props.squareNum}></div>);
    }
}

export default Square;
