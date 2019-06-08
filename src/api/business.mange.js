import request from '@/plugin/axios'

export function getBusinessExcel (params) {
  return request({
    url: '/business-entity-info/getExcel',
    method: 'get',
    params
  })
}

export function getBusinessPage (params) {
  return request({
    url: '/business-entity-info/page',
    method: 'get',
    params
  })
}

export function getBusinessAnalysisPage (params) {
  return request({
    url: '/business-entity-info/summary-analysis',
    method: 'get',
    params
  })
}

export function getShareHolderPage (params) {
  return request({
    url: '/holder-information/page',
    method: 'get',
    params
  })
}

export function getFarmIncomePage (params) {
  return request({
    url: '/land-income/farm-type/page',
    method: 'get',
    params
  })
}

export function getNetIncomePage (params) {
  return request({
    url: '/land-income/net-income/page',
    method: 'get',
    params
  })
}

export function getBusinessAnalysisChart (params) {
  return request({
    url: '/business-entity-info/operator-type-chart',
    method: 'get',
    params
  })
}

export function getFarmTypeChart (params) {
  return request({
    url: '/land-income/farm-type-chart',
    method: 'get',
    params
  })
}

export function getYearAnalysisChart (params) {
  return request({
    url: '/land-income/year-income-change-chart',
    method: 'get',
    params
  })
}

export function getResidenceIncomeChart (params) {
  return request({
    url: '/land-income/residence-chart',
    method: 'get',
    params
  })
}

export function getIncomeDistriPage (params) {
  return request({
    url: '/income-distribution/page',
    method: 'get',
    params
  })
}
