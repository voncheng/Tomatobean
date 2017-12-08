import React, { Component } from 'react';
import { getDisplayName } from '../util/tools';
/**
 *
 * @param {*目标组件} Comp
 * @param {*子集名称} childrenName
 */
export const BaseSubRouteConnect = (Comp, childrenName) => {
  class WithSubscription extends Component {
    render() {
      const {
        children,
        ...props
      } = this.props;
      return (
        <div>
          <Comp {...props} />
          <div className={childrenName}>{children}</div>
        </div>
      );
    }
  }
  WithSubscription.displayName = `BaseSubRouteConnect(${getDisplayName(Comp)})`;

  return WithSubscription;
};
