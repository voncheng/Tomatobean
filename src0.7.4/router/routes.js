import React, { Component } from 'react';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import { BaseComponentConnect, BaseParentRouteConnect } from '../connect';
import { tabBarIncrement, parentRouteCompVisible } from '../actions/kitAction';
import { checkAuthority, setAuthority } from '../actions/bizAction';
import routerConfig, { modules } from './modules';
import { getDisplayName } from '../util/tools';
// 是否需要认证后才可进入 如果为true  则第一次进入时认证，如果认证成功则后面的所有跳转不再认证
let isFsChk = false;
// console.log(isfschk);

// import {FadingRoute} from './FadingRoute';   vonvenient inline rendering

// /**
//  * 根据路由的初始配置标记判断是否需要展示到标签导航上
//  * @param {*路由初始配置} routes
//  * @param {*当前的路由地址} location
//  * @return 返回标签名
//  */
// const findLocationMarkWithRotes = (routes, location)=> {
//   for (var i = 0; i < routerConfig.length; i++) {
//     var route = routerConfig[i];
//     if (location.pathname == route.path) {
//       return route.state;
//     }
//     if (route.childRoutes) {
//       return findLocationMarkWithRotes(route.childRoutes, location);
//     }
//   }
// }

/**
 *
 * @desc 校验身份的集成方法
 * @param {any} route
 * @param {any} dispatch
 */
function checkAuthorityBean(route, dispatch) {
  if (route.state && route.state.checkAuthority === false) { // 是否需要校验身份
    dispatch(setAuthority(true));
  } else if (localStorage.fromLogin === 'true') { // 判断是不是从登陆页面直接登录
    localStorage.fromLogin = false;
    dispatch(setAuthority(true));
  } else if (isFsChk) {
    dispatch(checkAuthority((updateStatus) => {
      isFsChk = updateStatus;
    }));
  } else {
    dispatch(setAuthority(true));
  }
}
/**
 * 自动装配ParentRoute
 * @param {any} Comp
 * @param {any} route
 * @returns {any}
 */
function autowiredParentRoute(Comp, route) {
  const name = getDisplayName(Comp);
  if (name.indexOf('RootRouteConnect') < 0 && route.childRoutes) {
    return BaseParentRouteConnect(Comp);
  }
  return Comp;
}
/**
 * 根据路由的初始配置构造react-router的routes
 * @param {*路由初始配置} routes
 * @param {*redux的分发函数} dispatch
 * @return react-router的routes
 */
const transformConfig = (routes, dispatch) => {
  const deepLoop = (rts) => {
    rts.forEach((route) => {
      if (route.component) {
        let Comp = modules[route.compMatch];
        // HOC继承Base组件
        Comp = BaseComponentConnect(Comp, () => checkAuthorityBean(route, dispatch));
        // 自动配置BaseParentRoute
        Comp = autowiredParentRoute(Comp, route);
        // 渲染Comp
        route.component = (props) => {
          return <Comp {...props} />;
        };
        if (route.indexRoute) {
          route.indexRoute.onEnter = (nextState, replace) =>
            replace({ pathname: route.indexRoute.redirect, state: route.indexRoute.state });
        } else {
          route.onEnter = (nextState) => {
            if (route.childRoutes) {
              if (route.path === nextState.location.pathname) {
                dispatch(parentRouteCompVisible(false));
              } else {
                dispatch(parentRouteCompVisible(true));
              }
            } else {
              dispatch(parentRouteCompVisible(false));
            }

            if (nextState.location.state && nextState.location.state.mark) {
              if (nextState.location.pathname === route.path) {
                // console.log(nextState.location, route)
                dispatch(tabBarIncrement(nextState.location));
              } else {
                dispatch(tabBarIncrement({ pathname: route.path, state: route.state }));
              }
            } else if (route.state) {
              // console.log(nextState.location, route)
              if (nextState.location.pathname === route.path) {
                if (nextState.location.state) {
                  if (route.state) {
                    nextState.location.state.mark = route.state.mark;
                  }
                } else if (route.state) {
                  nextState.location.state = {
                    mark: route.state.mark,
                  };
                }
                dispatch(tabBarIncrement(nextState.location));
              } else {
                // console.log(nextState.location, route)
                dispatch(tabBarIncrement({ pathname: route.path, state: route.state }));
              }
            }
          };
        }
      }
      if (route.childRoutes) {
        deepLoop(route.childRoutes, dispatch);
      }
    });
  };
  deepLoop(routes);
  return routes;
};
class RouterTree extends Component {
  render() {
    const { history, dispatch } = this.props;
    return (<Router routes={transformConfig(routerConfig.routes, dispatch)} history={history} />);
  }
}
export default connect()(RouterTree);
