import setting from '@/setting.js'
import Cookies from 'js-cookie'
import WebStorageCache from 'web-storage-cache'

// wsCache 会在 Electron 环境下代替 Cookies
var wsCache = new WebStorageCache()

const cookies = {}

const IS_ELECTRON = process.env.VUE_APP_IS_ELECTRON

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  if (IS_ELECTRON) {
    wsCache.set(`d2admin-${setting.releases.version}-${name}`, value, {
      exp: currentCookieSetting.expires * 86400
    })
  } else {
    Cookies.set(`d2admin-${setting.releases.version}-${name}`, value, currentCookieSetting)
  }
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  const keyName = `d2admin-${setting.releases.version}-${name}`
  return IS_ELECTRON ? wsCache.get(keyName) : Cookies.get(keyName)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  const keyName = `d2admin-${setting.releases.version}-${name}`
  return IS_ELECTRON ? wsCache.delete(keyName) : Cookies.remove(keyName)
}

export default cookies
