import Vue from 'vue'

Vue.directive('hasAuthorization', {
  bind: (el) => {
    const roles = localStorage.getItem('roles')
    console.log(roles)
    if (!(localStorage.getItem('roles').indexOf('admin') > -1)) {
      el.setAttribute('style', 'display:none')
    }
  }
})
