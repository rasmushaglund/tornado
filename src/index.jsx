import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
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
      text: "Diska",
      deleted: false,
      tags: ["test"],
      lists: [0],
      contexts: [0, 2]
    },
    1: {
      id: 1,
      completed: false,
      text: "Ring försäkringskassan",
      tags: [],
      deleted: false,
      lists: [1],
      contexts: [1]
    },
    2: {
      id: 2,
      completed: false,
      text: "Laga punktering",
      tags: ["test"],
      deleted: false,
      lists: [1],
      contexts: [0]
    },
    3: {
      id: 3,
      completed: true,
      text: "Handla julklappar",
      tags: ["test"],
      deleted: false,
      lists: [0],
      contexts: [1]
    },
    4: {
      id: 4,
      completed: true,
      text: "Skotta",
      tags: [],
      deleted: false,
      lists: [1],
      contexts: [0]
    },
    5: {
      id: 5,
      completed: true,
      text: "Test",
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
      text: "Testlista"
    },
    {
      id: 1,
      deleted: false,
      text: "Hemmafix"
    }
  ],
  views: [
    {
      id: 0,
      deleted: false,
      text: "Test",
      filter: "hasTag('test') || hasList('Testlista')"
    },{
      id: 1,
      deleted: false,
      text: "Julfix",
      filter: "hasList('Hemmafix')"
    },{
      id: 2,
      deleted: false,
      text: "Default",
      filter: "!hasParent()"
    },
  ],
  contexts: [
    {
      id: 0,
      text: "dator"
    },
    {
      id: 1,
      text: "hemma"
    },
    {
      id: 2,
      text: "stan"
    }
  ]
}

const store = createStore(reducer, initialState)

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
