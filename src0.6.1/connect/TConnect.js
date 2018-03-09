/**
 * File: /Users/fengchengpu/Project/tomatobeen/src/connect/TConnect.js
 * Project: /Users/fengchengpu/Project/tomatobeen
 * Created Date: Monday November 13th 2017 5:39:47 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 13th 2017 5:56:03 pm
 * Modified By: chengpu
 * -----
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDisplayName } from '../util/tools';

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */
export default function (selects, actions) {
  return (Target) => {
    // console.log(descriptor, Target);
    class WithSubscription extends Component {
      render() {
        const {
          ...props
        } = this.props;
        return (
          <div>
            <div>
              <Target {...props} />
            </div>
          </div>
        );
      }
    }
    WithSubscription.displayName = `TabbarConnect(${getDisplayName(Target)})`;
    function mapState(state) {
      const states = {};
      selects.forEach((stateName) => {
        states[stateName] = state[stateName];
      }, this);
      return { ...states };
    }
    function mapDispatch(dispatch) {
      return {
        actions: bindActionCreators({ ...actions }, dispatch),
      };
    }
    return connect(mapState, mapDispatch)(WithSubscription);
  };
}

