/**
 * File: /Users/fengchengpu/Project/moonlight/src/index.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 4:18:28 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 4:18:28 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import confStore from './paramsStore/confStore';
import modelStore from './paramsStore/modelStore';
import setHost from './hostSetting';
import renderApp from './renderApp';
import { ModalSelecterConnect } from './connect';

export default function createApp() {
  return {
    config() {
    },
    router(conf) {
      confStore(conf);
    },
    model(model) {
      modelStore(model);
    },
    setHost(conf) {
      setHost(conf);
    },
    run() {
      renderApp();
    },
  };
}
export { ModalSelecterConnect as Selecter };
export { combinArray as combinModals } from './util/tools.js';
export { Authority } from './configuration/Authority';
export { Configuration } from './annotation/Configuration';

