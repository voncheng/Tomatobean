# Tomatobean 

## 
Tomatobean是一个react + redux + react-router的集成框架。它简化了三者的配置，在项目中只需少量代码就能实现复杂的功能，并且能够帮助开发者梳理工程的结构使其易于维护。tomatobean提供了大量的装饰器，为react组件提供更强大的功能。简单的语意，和使用规则让开发者迅速上手开发实现零成本学习。其中创新的使用了智能化自动装载机制，解放了程序员的双手。话不多说开搞。


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

&#8195;&#8195;属性名称&#8195;| 类型 | 默认值| 描述
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

你可以理解为持久层，他负责对接后台服务，也可以想象成数据源。将它但作为一块抽离出来目的是解耦，实现复用。

``` js

// 公共接口
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
/**
 * 根据用户Id查询用户信息
 */
export async function queryUserByIdRequest() {
  return request.GET(`${host}/user-service/user/list`);
}

/**
 * 创建用户信息
 */
export async function saveUserRequest(params) {
  return request.PSOT(`${host}/user-service/save`, params);
}

```

## 三.装饰器

`Tomato`提供的一些具体的方法、装饰器。这些东西能够为你的组件提供一些特殊的功能，比如：状态回滚、消息通知、路由跳转、location监听等等。

### 1.BaseAction
`BaseAction`提供基础功能，包括一下方法：

方法 | 参数 | 返回值 | 功能说明
--- | --- | --- | --- | ---
[linkTo](#linkTo)| (location) | -- | 跳转 
[redirect](#redirect)|(location)|-- | 重定向
[go](#go)|(number)| -- | 跳转指定浏览历史记录
[goBack](#goBack)| -- | -- | 回退 
[goForward](#goForward)| -- | -- | 前进
[rollBack](#rollBack)|(namespace)| -- | 组件状态回滚，回到最初状态（仅限于托管的状态）
 
>#### <span id="linkTo">linkTo</span>

**语法**

``` javascript
this.props.baseAction.linkTo(location);
// 例子
this.props.baseAction.linkTo("/home");
this.props.baseAction.linkTo({pathname: "/home", state: "hello world"});
```

**参数**
*location*
路由地址信息

**返回值**
无
>#### <span id="redirect">redirect</span>

**语法**
 
``` javascript
this.props.baseAction.redirect(location);
// 例子
this.props.baseAction.redirect("/home");
this.props.baseAction.redirect({pathname: "/home", state: "hello world"});
```

**参数**
*location*
路由地址信息

**返回值**
无
>#### <span id="go">go</span>

**语法**

``` javascript
this.props.baseAction.go(number);
// 例子
this.props.baseAction.go(1);
```

**参数**
*number*
回退步数

**返回值**
无
>#### <span id="goBack">goBack</span>

**语法**

``` javascript
this.props.baseAction.goBack();
```

**参数**
无

**返回值**
无
>#### <span id="goForward">goForward</span>

**语法**

``` javascript
this.props.baseAction.goForward();
```

**参数**
无

**返回值**
无

>#### <span id="rollBack">rollBack</span>

**语法**

``` javascript
this.props.baseAction.rollBack(namespace);
// 例子
this.props.baseAction.rollBack("home");
```

**参数**
*modelName*
模型的命名空间，也就是模型的名称

**返回值**
无
#### 2.Selecter
绑定`model`，`view`，`action`三者得工具。由`Tomato`划分出来的四大模块都是独立的，每一部分都不能独立工组，因为他们不是一个完整的系统。只有通过绑定，引用这些方式，组合在一起才能构成一个完整的组件。

使用实例：

``` javascript

import React, { Component } from 'react';
import { Selecter } from 'tomatobean';
import BaseActions from 'tomatobean/enhance';
import { getOpportunityList } from '../../models/home';

@Selecter(['home'], { getOpportunityList })
export class View extends Component {
  componentDidMount() {
    const { getOpportunityList } = this.props.actions;
    getOpportunityList();
  }

  render() {
    const { enters } = this.props.home;
    return (
      <div className="home-page">
        <p className="group-title">快捷进入</p>
          {enters}
        </div>
      </div>
    );
  }
}

```
#### 3.RootRouteConnect

标记根路由组件

#### 4.Configuration

标记当前类为配置类，重写系统的约定配置。

#### 5.Tabbar

提供Tabbar数据，如果需要重写Tabber组件，可通过@Tabbar装饰器修饰以获取系统数据。需要注意的是`Tomato`内部提供了一个Tabber样式组件可直接使用。

#### 6.Notification

通知中心，提供更便捷的通知服务。

`Notification`通知服务，其中包括一下方法：

方法 | 参数 | 返回值 | 功能说明
--- | --- | --- | --- | ---
[observer](#observer)|(name,func)| -- | 注册观察者
[postNotification](#postNotification)|(name,...params)|-- | 发送消息通知
[removeObserver](#removeObserver)| (name) | -- | 移除观察者

>#### <span id="observer">observer</span>

**语法**

``` javascript
const { observer } = this.props.notification;
const active = (message) => {
    console.log(message); //打印接收到的消息
    ...
}
observer('name', active);
```

**参数**
*name*
观察者名称
*active*
观察者你收到通知后做出响应

**返回值**
无
>#### <span id="postNotification">postNotification</span>

**语法**

``` javascript

const { postNotification } = this.props.notification;
postNotification('name', message);
        
```

**参数**
*name*
观察者名称
*message*
被发送的消息

**返回值**
无
>#### <span id="removeObserver">removeObserver</span>

**语法**

``` javascript

const { removeObserver } = this.props.notification;
removeObserver('name');
        
```

**参数**
*name*
观察者名称

**返回值**
无

### 配置类

#### 1.AuthorityInterceptor
方法1
>方法：static checkAuthority(author, redirect);
>用途：是不是有效用户权限（只会在第一次进入系统时是调用);
>参数：
>`@author`进入系统的遥控器(此方法可以作为信物传递)，只有当 author(true)时才会打开系统。
>`@redirect`重定向方法；

方法2
>方法：static preHandle(location, redirect);
>用途：每个页面进入之前的预处理（可以在此处做权限控制）；
>参数：
>`@location`当前访问的地址信息
>`@redirect`重定向方法
>`@author`进入系统的遥控器(此方法可以作为信物传递)，只有当 author(true)时才会打开系统。需要注意的是，系统必须存在一个状态，非开即关。所以无论如何author方法必须被调用。
>`@debut`是不是第一次进入系统。


### 工具方法

1.combinModals






文档正在更新中......

[TOC]

> <span id="jump">用户登录认证</span>


