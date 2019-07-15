import {
  combineReducers,
} from 'redux';
import { routerReducer } from 'react-router-redux';
import tabBarLocations, { parentRouteCompVisible } from './kitReducer';
import { authorityStatus } from './bizReducer';
import modelReducers from './modelReducers';

export default function gatherReducers() {
  const modReducers = modelReducers();
  const reducers = {
    tabBarLocations,
    parentRouteCompStatus: parentRouteCompVisible,
    authorityStatus,
    routing: routerReducer,
    ...modReducers,
  };
  return combineReducers(reducers);
}
