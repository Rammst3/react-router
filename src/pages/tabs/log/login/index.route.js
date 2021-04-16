import React from 'react'

const route = {
  name: '登录日志',
  transKey: 'Login Log',
  routeProps: {
    path: '/app/runLog/loginLog',
    component: React.lazy(() => import(/* webpackChunkName: 'loginlog' */'./index')),
  },
  permKey: 'menu.loginLog',
}

export default route