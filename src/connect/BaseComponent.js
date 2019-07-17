import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuthority } from '../actions/bizAction';
import { getDisplayName } from '../util/tools';
/**
 *
 * @param {*目标组件} Comp
 * @param {*回调函数} callBack
 */
export const BaseComponent = (Comp, callBack) => {
  class WithSubscription extends Component {
    componentDidMount() {
      callBack(this.props.location);
    }
    render() {
      const {
        ...props
      } = this.props;
      return (
        <React.Fragment>
          <Comp {...props} />
        </React.Fragment>
      );
    }
  }
  WithSubscription.displayName = `BaseComponentConnect(${getDisplayName(Comp)})`;

  return WithSubscription;
};
/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */

export const RootRoute = (Target) => {
  const WithSubscription = (props) => {
    const {
      children,
      authorityStatus,
      dispatch,
      ...others
    } = props;
    const actions = bindActionCreators({ checkAuthority }, dispatch);

    return (
      <React.Fragment>
        {authorityStatus ?
          <React.Fragment>
            <Target {...others} {...actions} children={children} />
            {/* <div className={`${getDisplayName(Target)}-childRoutes`}>{children}</div> */}
          </React.Fragment> : ''}
      </React.Fragment>
    );
  };
  WithSubscription.displayName = `RootRouteConnect(${getDisplayName(Target)})`;
  function mapState(state) {
    return { authorityStatus: state.authorityStatus };
  }
  return connect(mapState)(WithSubscription);
};

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */
export const readonly = (target, name, descriptor) => {
  descriptor.writable = false;
  return descriptor;
};


export const decorateArmour = (target, key, descriptor) => {
  const method = descriptor.value;
  //   console.log(descriptor, target, key);

  const moreDef = 100;
  let ret;
  descriptor.value = (...args) => {
    args[0] += moreDef;
    ret = method.apply(target, args);
    return ret;
  };
  return descriptor;
};
