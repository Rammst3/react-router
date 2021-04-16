import React from 'react'

const route = {
  name: '操作日志',
  transKey: 'Handle Log',
  routeProps: {
    path: '/app/runLog/handleLog',
    component: React.lazy(() => import(/* webpackChunkName: 'handlelog' */'./index')),
  },
  permKey: 'menu.handleLog',
}

export default route