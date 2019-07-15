/**
 * File: /Users/fengchengpu/Project/moonlight/src/config/confStore.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 4:42:24 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 4:42:24 pm
 * Modified By: chengpu
 * -----
 * 
 */
function confStoreCreate() {
  let config = {};
  return (conf) => {
    if (!conf) return config;
    config = conf;
  };
}
const confStore = confStoreCreate();
export default confStore;

