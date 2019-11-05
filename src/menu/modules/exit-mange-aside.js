export default {
  path: '/exit/mange',
  title: '退出管理',
  icon: 'el-icon-s-data',
  children: (pre => [
    { path: ``,
      title: '流程管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}apply`, title: '申报', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}audit`, title: '审核' },
        { path: `${pre}approve`, title: '审批' }
      ]
    },
    { path: ``,
      title: '查询统计',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}data`, title: '信息查询', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}chart`, title: '统计汇总' }
      ]
    }
  ])('/exit/mange/')
}
