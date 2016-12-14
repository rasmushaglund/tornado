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
      lists: ["Testlista"],
      contexts: ["hemma", "dator"]
    },
    1: {
      id: 1,
      completed: false,
      text: "Ring försäkringskassan",
      tags: [],
      deleted: false,
      lists: ["Hemmafix"],
      contexts: ["dator"]
    },
    2: {
      id: 2,
      completed: false,
      text: "Laga punktering",
      tags: ["test"],
      deleted: false,
      lists: ["Hemmafix"],
      contexts: ["hemma"]
    },
    3: {
      id: 3,
      completed: true,
      text: "Handla julklappar",
      tags: ["test"],
      deleted: false,
      lists: ["Testlista"],
      contexts: ["stan"]
    },
    4: {
      id: 4,
      completed: true,
      text: "Skotta",
      tags: [],
      deleted: false,
      lists: ["Hemmafix"],
      contexts: ["hemma"]
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
