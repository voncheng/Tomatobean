import { push, replace, goBack as back, goForward as forward, go as goto } from 'react-router-redux';
import { TABBAR_INCREMENT, TABBAR_DECREMENT, PARENT_ROUTE_COMP_VIS, STATE_ROLL_BACK } from '../constants/kitTypes';

/**
 * 新增头部导航标签
 * @param {*当前历史记录} currentLocation
 */
export function tabBarIncrement(currentLocation) {
  return { type: TABBAR_INCREMENT, currentLocation };
}
/**
 * 删除头部导航标签
 * @param {*any} currentLocation
 */
export function tabBarDecrementAndRedirect(currentLocation) {
  // console.log(currentLocation);
  return (dispatch, getState) => {
    const { tabBarLocations, routing } = getState();
    const currentMark = currentLocation.state.mark;
    const routingMark = routing.locationBeforeTransitions.state.mark;
    if (tabBarLocations.length > 1) {
      for (let i = 0, len = tabBarLocations.length; i < len; i++) {
        const locationMark = tabBarLocations[i].state.mark;
        if (locationMark === currentMark) {
          if (i < tabBarLocations.length - 1) {
            if (routingMark === currentMark) {
              dispatch(redirect(tabBarLocations[i + 1]));
            }
          } else if (routingMark === currentMark) {
            dispatch(redirect(tabBarLocations[i - 1]));
          }
        }
      }
    }

    dispatch(tabBarDecrement(currentLocation));
  };
}
/**
 * 删除头部导航标签
 * @param {*当前历史记录} currentLocation
 */
export function tabBarDecrement(currentLocation) {
  return { type: TABBAR_DECREMENT, currentLocation };
}
/**
 * 重定向
 * @param {*定向地址} location
 */
export function redirect(location) {
  return (dispatch) => {
    dispatch(replace(location));
  };
}
/**
 * 跳转
 * @param {*定向地址} location
 * @returns
 */
export function linkTo(location) {
  return (dispatch) => {
    dispatch(push(location));
  };
}
/**
 * 回退
 * @export
 * @returns
 */
export function goBack() {
  return (dispatch) => {
    dispatch(back());
  };
}
/**
 *
 * 前进
 * @export
 * @returns
 */
export function goForward() {
  return (dispatch) => {
    dispatch(forward());
  };
}
/**
 *
 * 跳转到指定的历史记录
 * @export
 * @param {*页码} number
 * @returns
 */
export function go(number) {
  return (dispatch) => {
    dispatch(goto(number));
  };
}
/**
 *
 * 多级路由下控制上级路由的显隐
 * @param {*是否显隐} statue
 */

export function parentRouteCompVisible(statue) {
  return { type: PARENT_ROUTE_COMP_VIS, visible: statue };
}
/**
 * 使一个state值回滚到初始值
 * @param {*} statue 
 */
export function rollBack(namespace) {
  return { type: STATE_ROLL_BACK, namespace: namespace };
}
