/**
 * File: /Users/fengchengpu/Project/moonlight/src/util/tools.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 6:13:58 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 6:13:58 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
/**
 * 按关键字分组(将一维数组分成二维数组)
 *
 * @param {Array<String>} array
 * @param {String} key
 * @returns { false | Array<Map<String,String>>}
 */
export function splitGroup(array, key) {
  if (!array || array === undefined || array === '' || !array.length) { return false; }
  const arr = array.concat();
  const ret = [];
  loop(arr[0][key]);
  function loop(scaleplate) {
    const temp = [];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (scaleplate === element[key]) {
        temp.push(element);
        arr.splice(index--, 1);
      }
    }
    ret.push(temp);
    if (arr.length) {
      loop(arr[0][key]);
    }
  }
  return ret;
}

/**
 * 深度遍历定位元素
 *
 * @param {{Array<String>}} array
 * @param {String} key
 * @param {Stirng} b
 * @param {Function} func
 * @returns {any}
 */
export function findPath(array, key, b, func, path = []) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.children && element.children.length) {
      path.push(element[key]);
      if (element[key].toString() === b.toString()) {
        return func(path.concat());
      }
      findPath(element.children, b, func, path);
    } else if (element[key].toString() === b.toString()) {
      path.push(element[key]);
      return func(path.concat());
    }
    if (i === array.length - 1) {
      path.pop();
    }
  }
}

/**
 * 获取组件展示名称即函数字面量
 *
 * @param {*Class} WrappedComponent
 * @returns {String}
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
/**
 * URL拼接字符串
 *
 * @param {any} url
 * @param {any} param
 * @returns {String} url
 */
export function urlAppendQuery(url, param) {
  if (!param) {
    return url;
  }
  let queryString = '';
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      queryString += `&${key}=${param[key]}`;
    }
  }
  if (queryString) {
    return `${url}?${queryString.substring(1)}`;
  }
  return url;
}
/**
 * 对象深拷贝
 * @param {any} p
 */
export function objDeepCopy(p) {
  const c = {};
  for (const k in p) {
    if (p.hasOwnProperty(k)) {
      c[k] = p[k];
    }
  }
  return c;
}
/**
 * 合并两个数组
 */
export function combinArray() {
  const args = [].slice.call(arguments);
  const ret = [];
  return ret.concat(...args);
}
/**
 * 对象、数组判空
 */
export function isEmpty(obj) {
  if (typeof obj === 'object' && !isNaN(obj.length)) {
    if (obj.length > 0) { return false; }
  } else if (typeof obj === 'object') {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false;
      }
    }
  }
  return true;
}
