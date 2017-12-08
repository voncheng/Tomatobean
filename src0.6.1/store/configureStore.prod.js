import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import gatherReducers from '../reducers';

const middleware = routerMiddleware(browserHistory);

const enhancer = applyMiddleware(thunk, middleware);

export default function configureStore(initialState) {
  return createStore(gatherReducers(), initialState, enhancer);
}

// var thunkMiddleware = function ({ dispatch, getState }) {
//     return function(next) {
//         return function (action) {
//             return typeof action === 'function' ?
//                 action(dispatch, getState) :
//                 next(action)
//         }
//     }
// }
