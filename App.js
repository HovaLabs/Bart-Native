import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Router from './app/Router';
import reducers from './app/reducers';

import rootSaga from './app/actions/sagas';

const sagaMiddleware = createSagaMiddleware();

class App extends Component {
  componentDidMount() {
    // Grab the GPS info and update state
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
