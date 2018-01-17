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
import BaseActions from './enhance';
import tomatoScan from './context';
import publicStore from './paramsStore/publicStore';

import { ModalSelecterConnect } from './connect';

// 扫描工程目录提取配置类及model
tomatoScan();

function createApp() {
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
/**
 * 构建相关
 */
export default createApp;
export { ModalSelecterConnect as Selecter };
export { combinArray as combinModals } from './util/tools.js';
/**
 * 配置相关
 */
export { AuthorityInterceptor } from './configuration/AuthorityInterceptor';
export { Configuration } from './annotation/Configuration';

/**
 * 增强器
 */
export { BaseActions };
export { Tabbar, Notification } from './enhance';

/**
 *工具方法
 */
export { publicStore };

