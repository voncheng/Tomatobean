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
        <React.Fragment>
          <Comp {...props} />
          <div className={childrenName}>{children}</div>
        </React.Fragment>
      );
    }
  }
  WithSubscription.displayName = `BaseSubRouteConnect(${getDisplayName(Comp)})`;

  return WithSubscription;
};
