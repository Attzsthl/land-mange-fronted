import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/data/module',
  name: 'data-module',
  meta,
  redirect: { name: 'data-module-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('data-center/template-mange'), meta: { ...meta, title: '模板管理' } },
    { path: 'data-import', name: `${pre}data-import`, component: _import('data-center/template-upload'), meta: { ...meta, title: '数据导入' } },
    { path: 'template-edit', name: `${pre}template-edit`, component: _import('data-center/template-edit'), meta: { ...meta, title: '模板编辑' } },
    { path: 'template-reg-population', name: `${pre}template-reg-population`, component: _import('data-center/template/template-reg-population'), meta: { ...meta, title: '户籍信息' } },
    { path: 'template-audit', name: `${pre}template-audit`, component: _import('data-center/template-audit'), meta: { ...meta, title: '上报审核' } }
  ])('data-module-')
}
