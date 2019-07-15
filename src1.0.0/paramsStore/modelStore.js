/**
 * File: /Users/fengchengpu/Project/moonlight/src/paramsStore/modelStore.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 5:05:26 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 5:05:26 pm
 * Modified By: chengpu
 * -----
 * 
 */
import { objDeepCopy } from '../util/tools';

function modelStoreCreate() {
  const models = [];
  return (mods) => {
    if (!mods) return models;
    mods.forEach((model) => {
      const newModel = objDeepCopy(model);
      // connectCount 未请求成功时，连接次数
      const connectCount = 0;
      const sts = model.state;
      for (const k in sts) {
        if (sts.hasOwnProperty(k)) {
          const newKey = `_${k}`;
          newModel[newKey] = connectCount;
        }
      }
      // maxConnect 未请求成功时，最大连接次数
      newModel.maxConnect = 1;
      newModel.reducers = {};
      const newReducers = newModel.reducers;

      // models可能有多种来源，手动设置权限高于扫描
      models.forEach((m, i) => {
        if (newModel.namespace === m.namespace) {
          model.splice(i, 1);
        }
      });
      models.push(newModel);

      const rdus = model.reducers;
      for (const k in rdus) {
        if (rdus.hasOwnProperty(k)) {
          newReducers[`${model.namespace}/${k}`] = rdus[k];
        }
      }
    });
  };
}
const modelStore = modelStoreCreate();
export default modelStore;
