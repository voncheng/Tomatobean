/**
 * File: /Users/fengchengpu/Project/moon/src/configer/check.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Wednesday December 13th 2017 6:22:19 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday December 13th 2017 6:22:19 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

// function dispatch(target, key, descriptor) {
//   descriptor.value = (...args)=>{
//     return method.apply(target, args);
//   }
//   return descriptor;
// }
export class AuthorityInterceptor {
  static getSuperName() {
    return AuthorityInterceptor.name;
  }
  /**
   * 是不是有效用户权限
   * @param {Func} author 进入系统的遥控器(此方法可以作为信物传递)，只有当 author(true)时才会打开系统。
   *              需要注意的是，系统必须存在一个状态，非开即关。所以无论如何author方法必须被调用。
   * @param {Func} redirect 从定向方法
   */
  static checkAuthority(author) {
    author(true);
  }
  /**
   * 每个页面进入之前的预处理（可以在此处做权限控制）
   * @param {Object} location 当前访问的地址信息
   * @param {Func} redirect 从定向方法
   */
  static preHandle() {
  }
}

