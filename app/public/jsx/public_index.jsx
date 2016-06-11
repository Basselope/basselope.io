import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import AppReducer from './reducers/reducers_index.jsx'
import AppReducer from './reducers/tweets.jsx'
import App from './components/app.jsx'

let store = createStore(AppReducer, window.STATE_FROM_SERVER);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)