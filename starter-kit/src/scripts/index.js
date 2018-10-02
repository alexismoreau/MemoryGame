import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './ui/pages/Hello';

require('../styles/index.scss');

const Index = () => (
  <React.Fragment>
    <Hello />
  </React.Fragment>
);

ReactDOM.render(<Index />, document.getElementById('index'));
