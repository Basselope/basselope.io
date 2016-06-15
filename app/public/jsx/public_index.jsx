import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'

import App from './components/App.jsx'
import rootReducer from './reducers/reducer_index.jsx'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// const stateStore = createStore(rootReducer, initialState,
//   compose(applyMiddleware(ReduxPromise),
//   window.devToolsExtension ? window.devToolsExtension() : f => f));

render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('app')
)