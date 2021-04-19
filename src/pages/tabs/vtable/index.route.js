import React from 'react'

const route = {
  name: '总结表格',
  routeProps: {
    path: '/app/vtable',
    component: React.lazy(() => import(/* webpackChunkName: 'system' */'./index')),
  },
  permKey: true,
}

export default route