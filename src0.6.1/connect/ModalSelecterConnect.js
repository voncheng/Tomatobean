import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDisplayName } from '../util/tools';
/**
 * 包装Action
 * @param {*Map<String,Object>} actions
 */
function packageActions(actions) {
  const newActions = {};
  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      const action = actions[key];
      newActions[key] = (params) => {
        return (dispatch) => {
          return Promise.resolve(action(params, dispatch));
        };
      };
    }
  }
  return newActions;
}

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */

export default function ModalSelecter() {
  const args = [].slice.call(arguments);
  let selects = [];
  let actions = [];
  const firstParam = args[0];
  if (typeof firstParam === 'object' && !isNaN(firstParam.length)) {
    selects = firstParam;
    actions = args[1] ? args[1] : [];
  } else if (typeof firstParam === 'object') {
    actions = firstParam;
  }

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
    WithSubscription.displayName = `ModalSelecterConnect(${getDisplayName(Target)})`;
    function mapState(state) {
      const states = {};
      selects.forEach((stateName) => {
        states[stateName] = state[stateName];
      }, this);
      return { ...states };
    }
    const newActions = packageActions(actions);
    function mapDispatch(dispatch) {
      return {
        actions: bindActionCreators({ ...newActions }, dispatch),
      };
    }
    return connect(mapState, mapDispatch)(WithSubscription);
  };
}
