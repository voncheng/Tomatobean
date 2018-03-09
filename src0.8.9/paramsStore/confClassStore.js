
/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/paramsStore/confClassStore.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Thursday December 14th 2017 11:08:23 am
 * Author: chengpu
 * -----
 * Last Modified:Friday December 15th 2017 11:29:20 am
 * Modified By: chengpu
 * -----
 * 
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
const confClassStore = confClassStoreCreate();
export default confClassStore;
