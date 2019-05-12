import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/land/mange',
  name: 'land-mange',
  meta,
  redirect: { name: 'land-mange-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('data-center/template/template-land-use'), meta: { ...meta, title: '土地管理' } },
    { path: 'analysis', name: `${pre}analysis`, component: _import('land-mange/land-analysis'), meta: { ...meta, title: '决策分析' } },
    { path: 'spatialDistribution', name: `${pre}spatialDistribution`, component: _import('land-mange/spatialDistribution'), meta: { ...meta, title: '空间分析' } }
  ])('land-mange-')
}
