/**
 * File: /Users/fengchengpu/Project/TomatoProject/moon/src/tomatobean/context.js
 * Project: /Users/fengchengpu/Project/TomatoProject/moon
 * Created Date: Saturday January 13th 2018 7:09:47 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday January 13th 2018 7:09:47 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import modelStore from './paramsStore/modelStore';

export default function scan() {
  const ct = require.context('tomatoScan', true, /\.c\.js$/);
  const ks = ct.keys();
  const testModals = [];
  for (let i = 0; i < ks.length; i += 1) {
    testModals.push(ct(ks[i]));
  }
  const context = require.context('tomatoScan', true, /\.m\.js$/);
  const keys = context.keys();
  const models = [];
  for (let i = 0; i < keys.length; i += 1) {
    models.push(context(keys[i]).default);
  }
  modelStore(models);
}

