import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers'
import App from './app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(reducer)

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
    const App = require('./app.jsx').default;
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
