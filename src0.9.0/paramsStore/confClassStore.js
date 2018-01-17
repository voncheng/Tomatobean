
/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/paramsStore/confClassStore.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Thursday December 14th 2017 11:08:23 am
 * Author: chengpu
 * -----
 * Last Modified:Friday December 15th 2017 11:29:20 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */

function confClassStoreCreate() {
  const context = require.context('../configuration', true, /\.js$/);
  function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
  }
  const cCs = requireAll(context);
  let config = {};
  cCs.forEach((conf) => {
    config = { ...config, ...conf };
  });

  return (className, conf) => {
    if (!className) return config;
    if (!conf) return config[className];
    config[className] = conf;
  };
}
/**
 * className 不存在则返回所有配置类
 * className存在 conf不存在 则返回该指定配置类
 * className 存在 conf存在 则写入该配置类
 */
const confClassStore = confClassStoreCreate();
export default confClassStore;
