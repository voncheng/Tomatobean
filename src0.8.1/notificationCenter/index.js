/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/notificationCenter/index.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Tuesday November 21st 2017 1:23:57 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 1:23:57 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
/**
 * 一个可以被构造的通知中心
 */
import notiExtension from './nofiFactory';

const noti = notiExtension();
export const observer = noti.registObserver;
export const notiCenter = noti.getCenter;
export const postNotification = noti.postNoti;
export const removeObserver = noti.removeOb;

