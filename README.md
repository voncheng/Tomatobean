
# Tomatobean 

## 
Tomatobean是一个react + redux + react-router的集成框架。它简化了三者的配置，在项目中只需少量代码就能实现复杂的功能，并且能够帮助开发者梳理工程的结构使其易于维护。tomatobean提供了大量的装饰器，为react组件提供更强大的功能。简单的语意，和使用规则让开发者迅速上手开发实现零成本学习。其中创新的使用了智能化自动装载机制，解放了程序员的双手。话不多说开搞。

[TOC]

版本更新历史：

[V0.9.0更新文档](https://github.com/VonCheng/Tomatobean/blob/master/src0.9.0/update-doc.md)
## 安装

安装命令: 
```
npm install tomatobean
```

## 一.快速开始

>加载配置文件生成App，就像这样

```javascript
import createApp, { combinModals } from 'tomatobean';
import { routerConfig } from '../config/routerConfig';
import models from './models';
import host from '../config/remoteHost';

const app = createApp();
// 加载路由配置
app.router(routerConfig);
// 加载数据模型
app.model(models);
// 配置remote host
app.setHost(host);
// 运行App
app.run();
```
app的运行依赖于这三个文件。其中model配置文件涉及到开发者具体项目的业务部分，也是开发者最关系的事情，接下来我会逐一解释这三个文件的用法和作用。

## 二.进阶

### 1. routerConfig
routerConfig 这个文件主要是配置工程的路由部分。由于tomato框架集成的是react-router组件，所以在配置上跟react-router有一些相似之处。只不过为了一些特殊的功能的实现，再其基础上进行了包装。整个配置文件看起来会是这样。

```javascript
export const routerConfig = {
  routes: [
    {
      path: '/',
      component: 'App',
      indexRoute: { redirect: '/home' },
      childRoutes: [
        {
          path: '/home',
          component: 'home',
          state: {
            mark: '首页',
          },
        },
      ],
    }, {
      path: '/login',
      component: 'login',
      state: {
        checkAuthority: false,
      },
    },
  ],
  initializationTabs: [
    {
      pathname: '/home',
      state: {
        mark: '首页',
      },
    },
  ],
};

```
*配置规则*

&#8195;&#8195;属性名称&#8195;| &#8195;类型 | 默认值| 描述
--- | --- | -- |---
routes | Object | &#8195;&#8195;&#8195;| 路由主体
initializationTabs| Object || 初始状态下Tabbar的展示项（可选）
path| string|| 匹配路径
component| string || React页面的放置路径
indexRoute| Object ||需要做重定向的操作对象
redirect| string | |重定向匹配路径
state| object || 浏览器Location的状态，可以在页面跳转的时候最为传值对象。`注:` 按需要内部可以添加任意多个值，在这里配置作为初始值使用
mark| sting ||是否作为Tabbar的展示项，如果有内容则值作为Tabbar的展示内容（可选）
childRoutes| Object || 子路由
checkAuthority| boolean|true| 需不需要做用户登录认证，也就是说在进入该页面之前是否判断当前用户已登录，没有登录将会跳转登录操作。用户认证的[具体配置](#jump)

### 2. models
models作为工程业务的主体部分，也是重点说明的模块。首先还是看一下代码。

```javascript
// home.js

export default {
  namespace: 'home', // 必须唯一 建议与文件名相同
  state: {
    enters: [],
  },
  reducers: {
    enters(state, action) {
      return {
        ...state,
        enters: action.data.data,
      };
    },
  },
};
```

一个最为基础的model看起来就是这个样子。你可以把它理解为托管一个React组件状态的机器，或者看做MVC中的M，总之它管控着React组件数据流。

*属性说明*

属性名称&#8195; | 类型 | 默认值 | 描述
--- | --- |---|---
namespace |string |&#8195;无&#8195;&#8195; | 命名空间这里也用做model的名称，需要保证唯一性
 state | object |{}| 数据模型，可以理解为需要托管的状态
 cache | boolean | false | 缓存类型（与`autowrite`属性关联）
 autowrite | object |null | 设置需要懒加载的`state`（与`cache`属性关联）
reducers | object |{}| 存放响应器[reducer](#reducer)。响应器是一个用于响应一个action事件，并更新states值的函数。
 注：
 > 1. 当cache: true ，在整个工程范围内，已设置的懒加载state，每条数据只会加载一次，（如果一次没有装载成功，那么接下来的取值还会继续装载，直到装载成功）
 > 当cache: false，但autowrite有值，那么装载机制的作用范围，就是以绑定模型的组件，而不是整个工程。
 
 >2. <span id="reducer">reducer</span>是一个用于响应[action](#action)事件的函数，它被注入了两个参数 `state` 和 `action`。其中`state`为当前的所有状态，`action`参数为[action](#action)事件传入的值。最后reducer返回一个全新的`state`。（温馨提示：请参照上方的代码进行理解）

 
### <span id="action">3. action</span>

`action`最基础的作用就是发起变更状态的请求。在具体的项目中，你可以将以一些了业务逻辑放在这里，也可以做单纯的数据结构处理。单独作为一个块，这样设计最初的目的也是为了解耦和复用。但多数情况下，`action`和`model`关系紧密，所以可以将两者放入一个文件中。但同时不要错误的将两者混为一谈。下面就是一个`action`

```javascript

// homeAction
import { getEntersListRequest } from '../api/homeApi';

export async function getOpportunityList(params, update) {
  const response = await getEntersListRequest(params);
  update({
    type: 'home/enters',
    data: response,
  });
  return response;
}

```

`action`尽量使用`async`声明，对于异步加载很方便。每一个`action`都被注入了一个参数`update`。`update`是一个函数，他只接收一个参数，这个参数是一个对象。其中`type`为必须属性，它的值指向的是用来响应它请求的，具体某个`model`下的某个`reducer`响应器。其他属性为携带参数，可以任意添加。

### <span id="action">4. api</span>

你可以理解为持久层，他负责对接后台服务，可以想象成数据源


下面要说的就是Tomato提供的一些具体的方法、装饰器、配置类的使用说明。







文档正在更新中......

> <span id="jump">用户登录认证</span>


