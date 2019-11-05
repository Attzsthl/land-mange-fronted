export default {
  path: '/land/mange',
  title: '土地管理',
  icon: 'el-icon-s-data',
  children: (pre => [
    { path: ``,
      title: '土地收益管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}index`, title: '现状查询', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}analysis`, title: '决策分析' },
        { path: `${pre}spatialDistribution`, title: '空间分析' }
      ]
    },
    { path: ``,
      title: '土地人口管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}index`, title: '现状查询', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}analysis`, title: '决策分析' },
        { path: `${pre}spatialDistribution`, title: '空间分析' }
      ]
    },
    { path: ``,
      title: '土地流转管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}index`, title: '现状查询', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}analysis`, title: '决策分析' },
        { path: `${pre}spatialDistribution`, title: '空间分析' }
      ]
    },
    { path: ``,
      title: '土地利用管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}index`, title: '现状查询', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}analysis`, title: '决策分析' },
        { path: `${pre}spatialDistribution`, title: '空间分析' }
      ]
    },
  ])('/land/mange/')
}
