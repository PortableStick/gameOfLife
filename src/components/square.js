import React, {Component} from 'react';
import classnames from 'classnames';

class Square extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      var squareClasses = classnames({
        'square': true,
        [`${this.props.activestate}`]: true
      });
      return (<div className={squareClasses}></div>);
    }
}

export default Square;
