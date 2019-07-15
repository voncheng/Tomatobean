import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDisplayName, isEmpty } from '../util/tools';
import modelStore from '../paramsStore/modelStore';
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
        return (dispatch, getStates) => {
          return Promise.resolve(action(params, dispatch, getStates()));
        };
      };
    }
  }
  return newActions;
}
/**
 * 1.一个模型上绑定多个自动装载器 如何区分具体是哪一条连接，去控制connectCount maxConnect
 * 2.多个model绑定到一个组件上   permissionConnect 如何区分模型以及如何区分具体是哪一条连接
 *
 */

// 给模型生成访问器
// connectCount 未请求成功时，连接次数
// maxConnect 未请求成功时，最大连接次数
// bo 传入组件的数据模型
// model 业务代码中配置的model
// redux的dispatch
// target组件的引用
function generate(bo, model, dispatch, target) {
  const actionCreators = model.autowrite;
  const isCache = model.cache;
  const newO = {};
  for (const key in bo) {
    if (bo.hasOwnProperty(key)) {
      const newKey = `_${key}`;
      const connectCount = newKey;
      newO[newKey] = bo[key];
      Object.defineProperty(newO, key, {
        get() {
          // console.log(target[`_${model.namespace}connectCount`]);
          // console.log(isEmpty(this[newKey]), this[newKey]);
          // console.log(target[`_${model.namespace}connectCount`][connectCount]);
          if (isCache) { // 是否设置为缓存机制
            if (isEmpty(this[newKey]) //  缓存无值
                && target[`_${model.namespace}permission`][connectCount]
                && actionCreators[key]
                && (model[connectCount] < model.maxConnect) // 未请求成功时，连接次数小于最大限制
            ) {
              // console.log('F');

              actionCreators[key]({}, dispatch).then(() => {
                // console.log('C');
                target[`_${model.namespace}permission`][connectCount] = false;
                model[connectCount] = 0;
              });
              // console.log(model[connectCount]);
              model[connectCount]++;
            }
          } else if (
            target[`_${model.namespace}permission`][connectCount]
            && actionCreators[key]
            && (target[`_${model.namespace}connectCount`][connectCount] < model.maxConnect)) { // 不是缓存机制但 设置了自动装载数据
            actionCreators[key]({}, dispatch).then(() => {
              target[`_${model.namespace}connectCount`][connectCount] = 0;
              target[`_${model.namespace}permission`][connectCount] = false;
            });
            target[`_${model.namespace}connectCount`][connectCount]++;
          }
          return this[newKey];
        },
        set(value) {
          this[newKey] = value;
        },
      });
    }
  }
  return newO;
}
// 匹配模型
function matchModel(models, matcheName) {
  for (let i = 0; i < models.length; i++) {
    const mod = models[i];
    if (mod.namespace === matcheName) {
      return mod;
    }
  }
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
      constructor(props) {
        super(props);
        const { dispatch } = this.props;
        const ownerProps = {};
        if (selects && selects.length) {
          const models = modelStore();
          selects.forEach((slt) => {
            const model = matchModel(models, slt);
            // 判断是否是自动缓存模型
            if (model.cache || !isEmpty(model.autowrite)) {
              // 初始化连接计数器
              const sts = model.state;
              const cco = {};
              const cpo = {};
              for (const k in sts) {
                if (sts.hasOwnProperty(k)) {
                  cco[`_${k}`] = 0;
                  cpo[`_${k}`] = true;
                  this[`_${model.namespace}connectCount`] = cco;
                  // 当前组件允许该模型自动装载数据
                  this[`_${model.namespace}permission`] = cpo;
                }
              }
              ownerProps[model.namespace] =
              generate(props[model.namespace], model, dispatch, this);
            } else {
              ownerProps[model.namespace] = model;
            }
          }, this);
        }
        this.ownerProps = ownerProps;
      }
      render() {
        const { ...props } = this.props;
        selects.forEach((slt) => {
          const model = props[slt];
          for (const key in model) {
            if (model.hasOwnProperty(key)) {
              this.ownerProps[slt][key] = model[key];
            }
          }
        }, this);

        const { dispatch, ...newProps } = this.ownerProps;
        return (
          <React.Fragment>
              <Target {...props} {...newProps} />
          </React.Fragment>
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
        dispatch,
      };
    }
    return connect(mapState, mapDispatch)(WithSubscription);
  };
}
