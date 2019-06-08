export default {
  path: '/business/mange',
  title: '经营管理',
  icon: 'el-icon-s-data',
  children: (pre => [
    { path: ``,
      title: '经营主体',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}search`, title: '经营主体信息', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}analysis`, title: '经营主体分析' }
      ]
    },
    { path: `cadastral-mange`,
      title: '地籍管理',
      icon: 'el-icon-s-opportunity'
    },
    { path: ``,
      title: '收益管理',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}shareholder-mange`, title: '股东管理', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}income-distribution`, title: '分配管理' }
      ]
    },
    { path: ``,
      title: '决策分析',
      icon: 'el-icon-s-opportunity',
      children: [
        { path: `${pre}farm-income-analysis`, title: '农用地收益分析', icon: 'el-icon-collection-tag'
        },
        { path: `${pre}year-income-analysis`, title: '年度收益分析' },
        { path: `${pre}comparsion-analysis`, title: '增收效果分析' }
      ]
    }
  ])('/business/mange/')
}
