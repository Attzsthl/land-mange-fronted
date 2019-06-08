// Vue
import Vue from 'vue'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'

// [ 可选组件 ]D2-Crud
import D2Crud from '@d2-projects/d2-crud'
// [ 可选组件 ] 图表
import VCharts from 'v-charts'
// [ 可选组件 ] 右键菜单
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
// [ 可选组件 ] JSON 树状视图
import vueJsonTreeView from 'vue-json-tree-view'
// [ 可选组件 ] 网格布局
import { GridLayout, GridItem } from 'vue-grid-layout'
// [ 可选组件 ] 区域划分
import SplitPane from 'vue-splitpane'
// [ 可选组件 ] UEditor
import VueUeditorWrap from 'vue-ueditor-wrap'
// [ 可选插件 ] 数据导入导出
import pluginExport from '@d2-projects/vue-table-export'
import pluginImport from '@d2-projects/vue-table-import'
// [ 可选过滤器 ] 日期相关过滤器
import d2VueFiltersDayjs from '@d2-admin/filters-dayjs'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'
import axios from 'axios'
import './common/directives'
import util from '@/libs/util.js'
import globalVariable from '@api/global_varible.js'
// 核心插件
Vue.use(d2Admin)

// 可选插件组件
Vue.use(D2Crud)
Vue.use(VCharts)
Vue.use(contentmenu)
Vue.use(vueJsonTreeView)
Vue.use(pluginExport)
Vue.use(pluginImport)
Vue.use(d2VueFiltersDayjs)
Vue.component('d2-grid-layout', GridLayout)
Vue.component('d2-grid-item', GridItem)
Vue.component('SplitPane', SplitPane)
Vue.component('VueUeditorWrap', VueUeditorWrap)
axios.default.baseURL = 'https://localhost:8888'
Vue.prototype.$axios = axios
Vue.prototype.global = globalVariable

// router.beforeEach((to, from, next) => {
//   const roles = localStorage.getItem('roles')
//   console.log(roles)
//   // 这边可以用match()来判断所有需要权限的路径，to.matched.some(item => return item.meta.loginRequire)
//   // console.log(roles)
//   // if (!roles && to.path !== '/login') {
//   //   next('/login')
//   // } else if (to.meta.permission) {
//   //   // 如果是管理员权限则可进入
//   //   roles.indexOf('admin') > -1 ? next() : next('/403');
//   // } else {
//   //   // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//   //   if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//   //     Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//   //       confirmButtonText: '确定'
//   //     })
//   //   } else {
//   //     next()
//   //   }
//   // }
// })

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        console.log('matched[0].path')
        console.log(matched[0].path)
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          const roles = util.cookies.get('roles')
          console.log(roles)
          const asideMenu = []
          _side[0].children.forEach(aside => {
            if (aside.meta && aside.meta.auth) {
              roles.indexOf('admin') > -1 ? asideMenu.push(aside) : asideMenu.push()
            } else {
              asideMenu.push(aside)
            }
          })
          console.log(asideMenu)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? asideMenu : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')

function formatDate (date, fmt) {
  date = new Date(date)
  if (typeof (fmt) === 'undefined') {
    fmt = 'yyyy-MM-dd HH:mm:ss'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
};

Vue.filter('FormatDate', function (date, fmt) {
  return formatDate(date, fmt)
})
