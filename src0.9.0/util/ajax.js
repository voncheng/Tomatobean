/**
 * File: /Users/fengchengpu/Project/moonlight/src/util/ajax.js
 * Project: /Users/fengchengpu/Project/moonlight
 * Created Date: Saturday November 11th 2017 6:00:32 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday November 11th 2017 6:00:32 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { message } from 'antd';
/**
 *
 * @param option    option [{
 *                      url:地址
 *                      method: "get"|"post",默认为"get"
 *                      data: {}
 *                      }]
 * @param response  function
 * @constructor
 */
let flag = true;
export default function Ajax(option, response, error) {
  // $.when( ).done(function (a) {});
  $.ajax({
    url: option.url,
    method: option.method || 'GET',
    data: option.data || {},
    dataType: 'json',
    // async: false,
    // timeout : 50000, //超时时间：50秒
    beforeSend(req) {
      req.setRequestHeader('token', localStorage.token);
    },
    contentType: option.contentType || 'application/json',
    success(data) {
      if (data.code === '401') {
        if (flag) {
          message.error(data.message, 2);
          flag = false;
        }
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        response(data);
      }
    },
    error(XMLHttpRequest) {
      if (XMLHttpRequest.status === 401) {
        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.code === '401') {
          message.error(XMLHttpRequest.responseJSON, 2);
          setTimeout(() => {
            window.location.href = '/login.html';
          }, 1000);
        }
      }
      if (error) {
        error(XMLHttpRequest.responseJSON);
      }
    },
  });
}
export const AjaxNor = (option, response, error) => {
  // $.when( ).done(function (a) {});
  $.ajax({
    url: option.url,
    method: option.method || 'GET',
    data: option.data || {},
    dataType: 'json',
    xhrFields: {
      withCredentials: true,
    },
    crossDomain: true,
    // async: false,
    // timeout : 50000, //超时时间：50秒
    beforeSend(req) {
      req.setRequestHeader('token', localStorage.token);
    },
    contentType: option.contentType || 'application/json',
    success(data) {
      response(data);
    },
    error(XMLHttpRequest) {
      if (error) {
        error(XMLHttpRequest.responseJSON);
      }
    },
  });
};
