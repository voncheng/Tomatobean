import { TABBAR_INCREMENT, TABBAR_DECREMENT, PARENT_ROUTE_COMP_VIS } from '../constants/kitTypes';
import routerConfig from '../router/modules';

const initializationLocations = routerConfig.initializationTabs;
export default (state = initializationLocations ? initializationLocations.concat() : [],
  action) => {
  switch (action.type) {
    case TABBAR_INCREMENT: {
      if (!action.currentLocation.state || !action.currentLocation.state.mark) {
        return state.concat();
      }
      for (let i = 0; i < state.length; i++) {
        const location = state[i];
        if (location.pathname === action.currentLocation.pathname) {
          state[i] = action.currentLocation;
          return state.concat();
        }
      }
      state.push(action.currentLocation);
      return state.concat();
    }
    case TABBAR_DECREMENT: {
      for (let i = 0; i < state.length; i++) {
        const location = state[i];
        if (location.pathname === action.currentLocation.pathname) {
          state.splice(i, 1);
          return state.concat();
        }
      }
      return state.concat();
    }
    default:
      return state;
  }
};

export const parentRouteCompVisible = (state = true, action) => {
  switch (action.type) {
    case PARENT_ROUTE_COMP_VIS:
      return action.visible;
    default:
      return state;
  }
};

