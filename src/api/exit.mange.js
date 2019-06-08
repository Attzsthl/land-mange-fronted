import request from '@/plugin/axios'

export function getExitProPage (params) {
  return request({
    url: '/exit-mange/pro-page',
    method: 'get',
    params
  })
}

export function submitExistApply (params) {
  return request({
    url: '/exit-mange/exit-apply',
    method: 'post',
    data: params
  })
}

export function getExitApplyInfo (params) {
  return request({
    url: '/exit-mange/exit-apply-info',
    method: 'get',
    params
  })
}

export function getSocialChangePage (params) {
  return request({
    url: '/exit-mange/social-change-page',
    method: 'get',
    params
  })
}

export function getStockPage (params) {
  return request({
    url: '/exit-mange/stock-change-page',
    method: 'get',
    params
  })
}
export function getCompensationPage (params) {
  return request({
    url: '/exit-mange/compensation-page',
    method: 'get',
    params
  })
}

export function saveCompensation (params) {
  return request({
    url: '/exit-mange/save-compensation',
    method: 'post',
    params
  })
}

export function getAnzhiPage (params) {
  return request({
    url: '/exit-mange/anzhi-page',
    method: 'get',
    params
  })
}

export function completeAudit (params) {
  return request({
    url: '/exit-mange/complete-apply',
    method: 'post',
    data: params
  })
}

export function completeApprove (params) {
  return request({
    url: '/exit-mange/complete-approve',
    method: 'post',
    data: params
  })
}
