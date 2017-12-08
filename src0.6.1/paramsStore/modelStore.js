/**
 * File: /Users/fengchengpu/Project/moonlight/src/paramsStore/modelStore.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 5:05:26 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 5:05:26 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { objDeepCopy } from '../util/tools';

function modelStoreCreate() {
  const models = [];
  return (mods) => {
    if (!mods) return models;
    mods.forEach((model) => {
      const newModel = objDeepCopy(model);
      newModel.reducers = {};
      const newReducers = newModel.reducers;
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
