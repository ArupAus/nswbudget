/* eslint-disable import/no-duplicates */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import getRoot from 'get-root'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { IntlProvider } from 'react-intl'
import { StyletronProvider } from 'styletron-react'
import Styletron from 'styletron'
import App from './components/App'
import './styles.css'
import './fonts.css'
import messages from './messages.json'
import rootReducer from './reducers'
import { locationToState, stateToLocation } from './url'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

const history = createHistory()

// parse initial location
//
const initialAppState = locationToState(history.location)
console.log("initial app state", initialAppState)

store.subscribe(() => {
  const location = stateToLocation(store.getState().app)
  history.push(location)
})

render((
  <StyletronProvider styletron={new Styletron()}>
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider messages={messages} locale="en">
          <App />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  </StyletronProvider>
), getRoot())
