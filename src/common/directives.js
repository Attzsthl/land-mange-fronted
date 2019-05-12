import Vue from 'vue'
import util from '@/libs/util.js'

Vue.directive('hasAuthorization', {
  bind: (el) => {
    const roles = util.cookies.get('roles')
    console.log(roles)
    if (!(roles.indexOf('admin') > -1)) {
      el.setAttribute('style', 'display:none')
    }
  }
})
