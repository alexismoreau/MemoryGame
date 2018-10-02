import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './ui/pages/Hello';
import Board from './ui/pages/Board';

require('../styles/index.scss');

const Index = () => (
  <React.Fragment>
    <Hello />
    <Board />
  </React.Fragment>
);

ReactDOM.render(<Index />, document.getElementById('index'));
