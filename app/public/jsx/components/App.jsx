require('materialize-loader');
require('../../scss/style_index.scss');

import React from 'react'

const App = (props) => (
  <div>
    {props.children}
  </div>
)

export default App