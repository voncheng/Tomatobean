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
  const config = {};
  return (className, conf) => {
    if (!className) return config;
    if (!conf) return config[className];
    config[className] = conf;
  };
}
const confClassStore = confClassStoreCreate();
export default confClassStore;
