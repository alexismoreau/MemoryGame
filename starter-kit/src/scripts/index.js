import React from 'react';
import ReactDOM from 'react-dom';

import Board from './ui/pages/Board';

require('../styles/index.scss');

const Index = () => (
  <React.Fragment>
    <Board />
  </React.Fragment>
);

ReactDOM.render(<Index />, document.getElementById('index'));
