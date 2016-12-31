import React from 'react';
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

const middleware = [ thunk ]
const store = createStore(reducer, applyMiddleware(...middleware))

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

render(
  <AppContainer>
    <Provider store={store}>
      <MuiThemeProvider>
        <App/>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <MuiThemeProvider>
            <App/>
          </MuiThemeProvider>
        </Provider>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
