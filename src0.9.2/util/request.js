/**
 * File: /Users/fengchengpu/Project/TomatoProject/moon/src/tomatobean/util/request.js
 * Project: /Users/fengchengpu/Project/TomatoProject/moon
 * Created Date: Saturday January 13th 2018 4:06:18 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday January 13th 2018 4:06:18 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import fetch from 'isomorphic-fetch';
import { urlAppendQuery } from '../util/tools';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    // window.location = '/login';
  }
  console.error(`请求错误 ${response.status}: ${response.url}`, response.statusText,);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function send(url, options, autoTips) {
  const defaultOptions = {
    // credentials: "include",
    headers: {
      'X-Auth-Token': localStorage.token,
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      // "Content-Type": "application/json; charset=utf-8",
      ...newOptions.headers,
    };
    if (newOptions.body) {
      let data = new URLSearchParams();
      Object.keys(newOptions.body).map(v => data.set(v, newOptions.body[v]));
      if (/multipart/.test(newOptions.headers['Content-Type'])) {
        newOptions.headers['Content-Type'] = 'multipart/form-data';
        data = new FormData();
        Object.keys(newOptions.body).map(v => data.append(v, newOptions.body[v]));
      }
      newOptions.body = data;
      // newOptions.body = JSON.stringify(newOptions.body);
    }
  }

  // 拼接路径参数
  let newUrl = url;
  if (options && options.params) {
    newUrl = urlAppendQuery(url, options.params);
  }

  const checkBiz = response => response.json().then((res) => {
    if (autoTips) {
      if (!res.success) {
        notification.error({
          message: res.msg,
        });
      } else if (res.msg) {
        notification.success({
          message: res.msg,
        });
      }
    }
    return res;
  });
  return fetch(newUrl, newOptions)
    .then(checkStatus)
    .then(checkBiz)
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
const request = {
  GET(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'GET' }, options);
    }
    return send(url, { ...options, method: 'GET' }, autoTips);
  },
  POST(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'POST' }, options);
    }
    return send(url, { ...options, method: 'POST' }, autoTips);
  },
  PUT(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'PUT' }, options);
    }
    return send(url, { ...options, method: 'PUT' }, autoTips);
  },
  DELETE(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'DELETE' }, options);
    }
    return send(url, { ...options, method: 'DELETE' }, autoTips);
  },
};
export default request;
