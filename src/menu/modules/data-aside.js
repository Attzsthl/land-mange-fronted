export default {
  path: '/data/module',
  title: '数据中心',
  icon: 'file-text',
  children: (pre => [
    { path: `${pre}index`, title: '模板管理', icon: 'arrows' },
    {
      path: `${pre}data-import`, title: '上报数据', icon: 'arrow-up'
    }
  ])('/data/module/')
}
