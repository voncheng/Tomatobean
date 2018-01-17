/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/paramsStore/publicStore.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Saturday December 16th 2017 7:21:45 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday December 16th 2017 7:21:45 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
function publicStoreCreate() {
  let config = {};
  return (conf) => {
    if (!conf) return config;
    config = conf;
  };
}
const publicStore = publicStoreCreate();
export default publicStore;
