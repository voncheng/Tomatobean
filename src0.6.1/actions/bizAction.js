import { replace } from 'react-router-redux';
import { CHECK_AUTHORITY } from '../constants/bizTypes';
import { AjaxNor } from '../util/ajax';

/**
 * 校验身份是否可以访问页面
 * @param {*是否可以访问} status
 */
export function checkAuthority(updateStatus) {
  return (dispatch) => {
    AjaxNor({
      url: `${host}/user/tokens/check`,
      method: 'GET',
    }, (json) => {
      if (json.code === '401') {
        dispatch(setAuthority(false));
        dispatch(replace({ pathname: '/login' }));
        // window.location.href = "/login";
      } else {
        if (updateStatus) {
          updateStatus(false);
        }
        dispatch(setAuthority(true));
      }
    }, (err) => {
      dispatch(setAuthority(false));
      dispatch(replace({ pathname: '/login' }));
      const error = new Error(err);
      throw error;
      // window.location.href = "/login";
    });
  };
}
/**
 * 校验身份是否可以访问页面
 * @param {*是否可以访问} status
 */

export function setAuthority(state) {
  return { type: CHECK_AUTHORITY, visible: state };
}
