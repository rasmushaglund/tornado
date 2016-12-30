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

const initialState = {
  tasks: {
    0: {
      id: 0,
      completed: false,
      name: "Diska",
      deleted: false,
      tags: ["test"],
      lists: [0],
      contexts: [0, 2]
    },
    1: {
      id: 1,
      completed: false,
      name: "Ring försäkringskassan",
      tags: [],
      deleted: false,
      lists: [1],
      contexts: [1]
    },
    2: {
      id: 2,
      completed: false,
      name: "Laga punktering",
      tags: ["test"],
      deleted: false,
      lists: [1],
      contexts: [0]
    },
    3: {
      id: 3,
      completed: true,
      name: "Handla julklappar",
      tags: ["test"],
      deleted: false,
      lists: [0],
      contexts: [1]
    },
    4: {
      id: 4,
      completed: true,
      name: "Skotta",
      tags: [],
      deleted: false,
      lists: [1],
      contexts: [0]
    },
    5: {
      id: 5,
      completed: true,
      name: "Test",
      tags: ["test"],
      lists: [],
      deleted: false,
      contexts: []
    },
  },
  lists: [
    {
      id: 0,
      deleted: false,
      name: "Testlista"
    },
    {
      id: 1,
      deleted: false,
      name: "Hemmafix"
    }
  ],
  views: [
    {
      id: 0,
      deleted: false,
      name: "Test",
      filter: "hasTag('test') || hasList('Testlista')"
    },
    {
      id: 1,
      deleted: false,
      name: "Julfix",
      filter: "hasList('Hemmafix')"
    },
    {
      id: 2,
      deleted: false,
      name: "Default",
      filter: "!hasParent()"
    },
  ],
  contexts: [
    {
      id: 0,
      name: "dator"
    },
    {
      id: 1,
      name: "hemma"
    },
    {
      id: 2,
      name: "stan"
    }
  ]
}

const middleware = [ thunk ]
const store = createStore(reducer, initialState, applyMiddleware(...middleware))

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
