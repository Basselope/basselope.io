import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import routes from './routes.jsx'
import rootReducer from './reducers/reducer_index.jsx'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('app')
)