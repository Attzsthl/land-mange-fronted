
import request from '@/plugin/axios'
export function getLandUseTypePage (params) {
  return request({
    url: '/land-use-type/page',
    method: 'get',
    params
  })
}

export function getAnalysisData (params) {
  return request({
    url: '/land-use-type/analysis',
    method: 'get',
    params
  })
}
