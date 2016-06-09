import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

let store = createStore(rootReducer, window.STATE_FROM_SERVER);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
