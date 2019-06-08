import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/business/mange',
  name: 'business-mange',
  meta,
  redirect: { name: 'business-mange-search' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'search', name: `${pre}search`, component: _import('business-mange/business-search'), meta: { ...meta, title: '经营主体查询' } },
    { path: 'analysis', name: `${pre}analysis`, component: _import('business-mange/business-analysis'), meta: { ...meta, title: '汇总统计' } },
    { path: 'cadastral-mange', name: `${pre}cadastral-mange`, component: _import('land-mange/spatialDistribution'), meta: { ...meta, title: '地籍管理' } },
    { path: 'shareholder-mange', name: `${pre}shareholder-mange`, component: _import('business-mange/shareholder-mange'), meta: { ...meta, title: '股东管理' } },
    { path: 'income-distribution', name: `${pre}income-distribution`, component: _import('business-mange/income-distribution'), meta: { ...meta, title: '分配管理' } },
    { path: 'farm-income-analysis', name: `${pre}farm-income-analysis`, component: _import('business-mange/farm-income-analysis'), meta: { ...meta, title: '农用地收益分析' } },
    { path: 'year-income-analysis', name: `${pre}year-income-analysis`, component: _import('business-mange/year-income-analysis'), meta: { ...meta, title: '年度收益分析' } },
    { path: 'comparsion-analysis', name: `${pre}comparsion-analysis`, component: _import('business-mange/comparsion-analysis'), meta: { ...meta, title: '对比收益分析' } },
    { path: 'comparsion-analysis', name: `${pre}comparsion-analysis`, component: _import('business-mange/comparsion-analysis'), meta: { ...meta, title: '对比收益分析' } },
    { path: 'analysis-charts', name: `${pre}analysis-charts`, component: _import('components/business-analysis-chart'), meta: { ...meta, title: '对比收益分析' } }
  ])('business-mange-')
}
