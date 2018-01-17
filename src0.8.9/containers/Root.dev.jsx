import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
import RouterTree from '../router/routes';
// var App = require('../pages/App.jsx');

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div>
          <RouterTree history={history} />
        </div>
      </Provider>
    );
  }
}
// / <DevTools />
