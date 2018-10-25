### Tomatobean v0.9.0 更新说明（此版本下兼容）

#### update1: 兼容create-react-app
本次更新针对官方构建工具create-react-app做了一些改动。完成了`create-react-app` + `tomatobean` 最佳开发实践。两者搭配能够快速构建工程，降低了学习成本。对于初学者来说能够抛开webpack复杂的配置，单其中会对webpack的配置文件做少量的修改。具体可以查看[Demo](https://github.com/VonCheng/TBExample)。
#### update2: 新增自动扫描功能
上个版本中配置类和model需要手动引入，但在此版本中只需要加入扫描路径就可以。具体配置方法如下：

1.修改文件名。
如果过当前文件是配置类文件需要将文件的后缀改为`xxx.c.js` ，然后使用`@Configuration`修饰一下。像这样

``` js
import { Configuration, AuthorityInterceptor } from 'tomatobean';

@Configuration
export class AI extends AuthorityInterceptor {
    ...
}
```

如果是model文件则只需要将文件名的后缀改为`xxx.m.js`。TODO：引入修饰符

2.在wepack的配置文件中加入扫描路径。格式像这样。

``` js
alias: {
      // tomato的扫描路径
      tomatoScan: path.join(__dirname, './src'),
      // 页面路径
      pages: path.join(__dirname, './src/pages/'),      
    }
```
#### update3: 变更方法的导出来源

曾经需要指明方法具体包的来源，像这样：

``` js
// 旧版本
import BaseActions, { Notification, Tabbar } from 'tomatobean/enhance';
```
最新版本中所有tomatobean提供的方法和对象都可以从更目录中导出，像下面这样：

``` js
import {BaseActions, Notification, Tabbar } from 'tomatobean';
```
#### update4: page组件可以使用ES6方式导出

曾经导出方式，像这样：

``` js

import React, { Component } from 'react';

class View extends Component {
  render() {
    return (
      <div>
        这是一个页面
      </div>
    );
  }
}
module.exports = View;

```
最新版本中可以这样导出，像下面这样：

``` js

import React, { Component } from 'react';

export default class View extends Component {
  render() {
    return (
      <div>
        这是一个页面
      </div>
    );
  }
}

```



