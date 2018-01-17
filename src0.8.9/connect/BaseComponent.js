import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkAuthority } from '../actions/bizAction';
import { getDisplayName } from '../util/tools';
/**
 * 获取函数字面量
 */
Function.prototype.getName = () => {
  return this.name || this
    .toString()
    .match(/function\s*([^(]*)\(/)[1];
};
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
        <div>
          <Comp {...props} />
        </div>
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
      <div>
        {authorityStatus ?
          <div>
            <Target {...others} {...actions} />
            <div className={`${getDisplayName(Target)}-childRoutes`}>{children}</div>
          </div> : ''}
      </div>
    );
  };
  WithSubscription.displayName = `RootRouteConnect(${getDisplayName(Target)})`;
  function mapState(state) {
    return { authorityStatus: state.authorityStatus };
  }
  return connect(mapState)(WithSubscription);
};

// export const BaseComponent = (Target, name, descriptor) => {
//     descriptor = Object.getOwnPropertyDescriptor(Target, 'prototype')
//     var Cmp_ = descriptor.value
//     // console.log(originalMethod)
//      descriptor.value = (...args) => {

//         class FF extends Component {
//                 constructor(props) {
//                     super(props);
//                 }
//                 render() {
//                     const {
//                         children,
//                         ...props
//                     } = this.props;
//                     return (
//                         <div>
//                             <Target {...props}/>
//                             <div className={Target.name + '-childRoutes'}>{children}</div>
//                         </div>
//                     );
//                 }
//             }
//             return FF()
//      }
//     console.log(descriptor);
//     // return descriptor;
// }

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
