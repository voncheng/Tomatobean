/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/annotation/Configure.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Thursday December 14th 2017 10:58:33 am
 * Author: chengpu
 * -----
 * Last Modified:Thursday December 14th 2017 10:58:33 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import confClassStore from '../paramsStore/confClassStore';
// export default function Configuration(target, key, descriptor) {
//   const method = descriptor.value;
//   descriptor.value = (...args) => {
//     return method.apply(target, args);
//   };
//   return descriptor;
// }
export function Configuration(target) {
  const className = target.getSuperName();
  confClassStore(className, target);
  return target;
}
