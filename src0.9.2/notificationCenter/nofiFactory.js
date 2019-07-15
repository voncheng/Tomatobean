/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/notificationCenter/nofiFactory.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Tuesday November 21st 2017 1:38:30 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 1:38:30 pm
 * Modified By: chengpu
 * -----
 * 
 */
export default function notiExtension() {
  const center = {};
  const extension = {
    registObserver(obName, func) {
      center[obName] = func;
      return center;
    },
    getCenter() {
      return center;
    },
    postNoti(obName, obj) {
      if (!center[obName]) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`The observer '${obName}' is not found. You may have removed the observer`);
        }
        return false;
      }
      center[obName](obj);
    },
    removeOb(obName) {
      delete center[obName];
    },
  };
  /**
   * 返回一个可以注册器
   */
  return extension;
}


// notification.observer('ob', (obj) => {
//   console.log(obj);
// });
// notification.('ob', {});
