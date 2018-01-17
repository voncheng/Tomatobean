import { createStore, applyMiddleware, compose } from 'redux';
// import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import gatherReducers from '../reducers';
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(browserHistory);

const enhancer = compose(
  applyMiddleware(thunk, middleware),
  // persistState(
  //   window.location.href.match(
  //     /[?&]debug_session=([^&#]+)\b/
  //   )
  // )
);

export default function configureStore(initialState) {
  const store = createStore(gatherReducers(), initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }
  return store;
}
