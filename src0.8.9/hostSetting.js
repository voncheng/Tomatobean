/**
 * File: /Users/fengchengpu/Project/moonlight/src/hostSetting.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 4:19:16 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 4:19:16 pm
 * Modified By: chengpu
 * -----
 * 
 */
export default function setHost(conf) {
  // 是否是生产环境
  if (process.env.NODE_ENV === 'production') {
  // 是否有缓存
    if (!sessionStorage.host) {
    // 是否是外部设置
      if (process.env.HOST_ENV) {
        sessionStorage.host = process.env.HOST_ENV;
      } else {
        sessionStorage.host = conf.prod;
      }
    }
  } else if (process.env.HOST_ENV) {
    sessionStorage.host = process.env.HOST_ENV;
  } else {
    sessionStorage.host = conf.dev;
  }
  window.host = sessionStorage.host;
}
