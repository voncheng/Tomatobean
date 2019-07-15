/**
 * File: /Users/fengchengpu/Project/moon/src/tomatobean/enhance/Notification.js
 * Project: /Users/fengchengpu/Project/moon
 * Created Date: Wednesday November 22nd 2017 9:43:28 am
 * Author: chengpu
 * -----
 * Last Modified:Wednesday November 22nd 2017 9:43:28 am
 * Modified By: chengpu
 * -----
 * 
 */
import React from 'react';
import * as noti from 'notificationcenter';
import { getDisplayName } from '../util/tools';

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */
export function NotificationEn(Target) {
  const WithSubscription = (props) => {
    return (
      <React.Fragment>
        <Target {...props} notification={noti} />
      </React.Fragment>
    );
  };

  WithSubscription.displayName = `NotificationEn(${getDisplayName(Target)})`;

  return WithSubscription;
}
