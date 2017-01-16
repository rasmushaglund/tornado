import React from 'react';
import Redbox from 'redbox-react'
import { Map, fromJS } from 'immutable'
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers'
import App from './app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const middleware = [ thunk, createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS()
}) ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <AppContainer errorReporter={Redbox}>
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./reducers', function () {
    console.log('Store updated. Replacing root reducer');
    try {
      var newReducer = require('./reducers');
      store.replaceReducer(newReducer);
    } catch (err) {
      console.error('Error updating store', err);
    }
  });
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default

    try {
    render(
      <AppContainer errorReporter={Redbox}>
        <Provider store={store}>
          <MuiThemeProvider>
            <App/>
          </MuiThemeProvider>
        </Provider>
      </AppContainer>,
      document.querySelector("#app")
    );
    } catch (err) {
      console.err(err)
    }
  });
}
