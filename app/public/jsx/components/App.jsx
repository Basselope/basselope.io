require('materialize-loader');
require('../../scss/stylesheet.scss');

import React from 'react'

const App = (props) => (
  <div>
    {props.children}
  </div>
)

export default App