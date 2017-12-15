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
export class Authority {
  static getSuperName() {
    return Authority.name;
  }
  static checkAuthority() {
  }
}

