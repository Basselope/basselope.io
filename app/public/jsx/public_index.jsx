import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import searchReducer from './reducers/searchBarReducer.jsx'
import App from './components/app.jsx'

let store = createStore(searchReducer, window.STATE_FROM_SERVER);

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
