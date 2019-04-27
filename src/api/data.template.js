import request from '@/plugin/axios'
export function getTemplatePage (params) {
  return request({
    url: '/template-page',
    method: 'get',
    params
  })
}
