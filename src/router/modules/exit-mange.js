import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/exit/mange',
  name: 'exit-mange',
  meta,
  redirect: { name: 'exit-mange-apply' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'apply', name: `${pre}apply`, component: _import('exit-mange/exit-apply-for'), meta: { ...meta, title: '退出申请' } },
    { path: 'audit', name: `${pre}audit`, component: _import('exit-mange/exit-audit'), meta: { ...meta, title: '审核' } },
    { path: 'approve', name: `${pre}approve`, component: _import('exit-mange/exit-approve'), meta: { ...meta, title: '审批' } },
    { path: 'audit-step1', name: `${pre}audit-step1`, component: _import('exit-mange/audit/exit-audit-step1'), meta: { ...meta, title: '申请人基本信息审核' } },
    { path: 'audit-step2', name: `${pre}audit-step2`, component: _import('exit-mange/audit/exit-audit-step2'), meta: { ...meta, title: '社保类型变更登记' } },
    { path: 'audit-step3', name: `${pre}audit-step3`, component: _import('exit-mange/audit/exit-audit-step3'), meta: { ...meta, title: '股权类型变更登记' } },
    { path: 'audit-step4', name: `${pre}audit-step4`, component: _import('exit-mange/audit/exit-audit-step4'), meta: { ...meta, title: '地面附着物赔偿计算' } },
    { path: 'audit-step5', name: `${pre}audit-step5`, component: _import('exit-mange/audit/exit-audit-step5'), meta: { ...meta, title: '失地拆迁登记' } },
    { path: 'audit-step6', name: `${pre}audit-step6`, component: _import('exit-mange/audit/exit-audit-step6'), meta: { ...meta, title: '审核意见' } },
    { path: 'final-approve', name: `${pre}final-approve`, component: _import('exit-mange/audit/exit-final-approve'), meta: { ...meta, title: '最终审批' } },
    { path: 'data', name: `${pre}data`, component: _import('demo/d2-crud/demo29'), meta: { ...meta, title: '退出信息汇总' } },
    { path: 'chart', name: `${pre}chart`, component: _import('demo/charts/list/histogram/demo1'), meta: { ...meta, title: '退出信息分析' } }
  ])('exit-mange-')
}
