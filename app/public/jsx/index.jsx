import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Provider } from 'react-redux'


import ReduxPromise from 'redux-promise'

import routes from './routes/routes.jsx'
import reducers from './reducers/reducer_index.jsx'

const rootReducer = combineReducers({...reducers, routing: routerReducer});
const store = createStore(rootReducer, applyMiddleware(ReduxPromise));
const history = syncHistoryWithStore(browserHistory, store);


require('materialize-loader');
require('../scss/stylesheet.scss');

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app')
);