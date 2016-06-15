import React, {Component} from 'react';
import Gameboard from './gameboard.js';

class App extends Component {

    render() {
      return (
        <div className="container">
          <Gameboard width={20} height={20}/>
        </div>
      );
    }
}

export default App;
