import { replace } from 'react-router-redux';
import { CHECK_AUTHORITY } from '../constants/bizTypes';
// import { AjaxNor } from '../util/ajax';
import confClassStore from '../paramsStore/confClassStore';
/**
 * 校验身份是否可以访问页面
 * @param {*是否可以访问} status
 */

export function setAuthority(state) {
  return { type: CHECK_AUTHORITY, visible: state };
}
/**
 * 分析外部提供的进入系统的状态值做出响应
 * @param {*} dispatch
 * @param {*} statue 是否可以进入程序
 * @param {*} updateStatus
 */
export function authorityDispatch(dispatch, statue, updateStatus) {
  if (statue) {
    if (updateStatus) {
      updateStatus(false);
    }
    dispatch(setAuthority(true));
  } else {
    dispatch(setAuthority(statue));
  }
}
/**
 * 校验身份是否可以访问页面
 * @param {*是否可以访问} status
 */
export function checkAuthority(updateStatus, fulfilled) {
  return (dispatch) => {
    // 获取配置类
    const AuthorityInterceptor = confClassStore('AuthorityInterceptor');
    // 设置进入系统权限 blean
    const authority = (statue, resolve) => {
      authorityDispatch(dispatch, statue, updateStatus);
      resolve(statue);
    };
    // 重定向方法
    const redirect = (loaction) => {
      dispatch(replace(loaction));
    };
    // 注入authority和redirect 方法
    new Promise((resolve) => {
      AuthorityInterceptor.checkAuthority(statue => authority(statue, resolve), redirect);
    }).then(fulfilled);
  };
}
