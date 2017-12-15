/**
 * File: /Users/fengchengpu/Project/tomatobeen/src/connect/TabbarConnect.js
 * Project: /Users/fengchengpu/Project/tomatobeen
 * Created Date: Monday November 13th 2017 5:45:11 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 13th 2017 5:56:22 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import TConnect from '../connect';
import { tabBarDecrementAndRedirect, linkTo, tabBarDecrement } from '../actions/kitAction.js';

export function TabbarEn() {
  return TConnect(['tabBarLocations', 'routing'], { tabbarActions: { tabBarDecrementAndRedirect, linkTo, tabBarDecrement } });
}
