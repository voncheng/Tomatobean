import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parentRouteCompVisible } from '../actions/kitAction.js';
import { getDisplayName } from '../util/tools';
/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */

export const BaseParentRoute = (Target) => {
  class WithSubscription extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bridge: null,
      };
      this.bridge = this.bridge.bind(this);
    }
    /**
     *
     *
     * @param {*通知信息} [info=null]
     * @param {*后续操作(可选)} action
     *
     * @memberof 连接上下级路由，通知作用
     */
    bridge(info = null, action) {
      this.setState({
        bridge: info,
      });

      setTimeout(() => {
        this.setState({
          bridge: null,
        });
        if (action) {
          action();
        }
      });
    }
    render() {
      const {
        children,
        parentRouteCompStatus,
        actions,
        ...props
      } = this.props;
      const childrenO = React.Children.map(children, (o, i) => {
        return React.cloneElement(o, { bridge: this.bridge, key: i });
      });
      return (
        <React.Fragment>
          <div
            style={{ display: props.route.path === props.location.pathname ? 'block' : (parentRouteCompStatus ? 'block' : 'none') }}
          >
            <Target {...props} bridge={this.state.bridge} />
          </div>
          <div className={`${getDisplayName(Target)}-childRoutes`}>{childrenO}</div>
        </React.Fragment>
      );
    }
  }
  WithSubscription.displayName = `BaseParentRouteConnect(${getDisplayName(Target)})`;
  function mapState(state) {
    return { parentRouteCompStatus: state.parentRouteCompStatus };
  }

  function mapDispatch(dispatch) {
    return {
      actions: bindActionCreators({ parentRouteCompVisible }, dispatch),
    };
  }
  return connect(mapState, mapDispatch)(WithSubscription);
};
