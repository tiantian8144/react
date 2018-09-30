import React from 'react'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base' // 基础
import * as sysSet from '@pages/setCenter' // 设置中心-系统设置
// import * as menu from '@pages/menu' // 菜单


//webpack 在编译时，会静态地解析代码中的 require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
//require.ensure(dependencies: String[], callback: function(require), chunkName: String)
//依赖 dependencies
  //这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。
//回调 callback
  //当所有的依赖都加载完成后，webpack会执行这个回调函数。require 对象的一个实现会作为一个参数传递给这个回调函数。因此，我们可以进一步 require() 依赖和其它模块提供下一步的执行。
//chunk名称 chunkName
  //chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。

// 图表
const echarts = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/echarts').default)
  }, 'echarts') 
}

// 测试
const chat = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/chat').default)
  }, 'chat')
}

// 编辑器
const editor = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/editor').default)
  }, 'editor')
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.welcome} />
      <Route path="/desk$/index" component={base.example} />
      {/** *菜单 开始 */}
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/chat" getComponent={chat} />
      {/** *菜单 结束 */}
      {/** *系统设置 开始 */}
      <Route path={`/${set}/userManage`} component={sysSet.userManage} />
      <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
      <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
      {/** *系统设置 结束 */}
    </Route>
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
