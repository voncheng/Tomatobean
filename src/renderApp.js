/**
 * File: /Users/fengchengpu/Project/moonlight/src/renderApp.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 4:18:58 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 4:18:58 pm
 * Modified By: chengpu
 * -----
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { tabBarIncrement } from './actions/kitAction';
// import configureStore from './store/configureStore';
// import Root from './containers/Root';
// import createHistory from 'history/lib/createBrowserHistory'

export default function renderApp() {
  // 如果在调试模式必须 取default
  const Root = require('./containers/Root');
  // console.log(Root);
  const configureStore = require('./store/configureStore');

  const store = configureStore();

  const history = syncHistoryWithStore(browserHistory, store);
  // const history = syncHistoryWithStore(createHistory({
  //   forceRefresh: false
  // }), store);

  /**
   * 监听浏览历史用于头部导航标签
   *
   */

  history.listen((location) => {
    // 多级路由下 控制上级路由的显隐
    // store.dispatch(parentRouteCompVisible(true))
    if (location.state && location.state.mark) {
      store.dispatch(tabBarIncrement(location));
    }
    // 切换页面时滚动到顶部
    document.body.scrollTop = 0;
  });
  ReactDOM.render(
    <Root
      store={store}
      history={history}
    />,
    document.getElementById('root')
  );
}
