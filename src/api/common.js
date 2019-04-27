import request from '@/plugin/axios'
export function getLandApprovePage (params) {
  return request({
    url: '/mangeApprove',
    method: 'post',
    params
  })
}

export function getExcel () {
  return request({
    url: '/getExcel',
    method: 'GET',
    params: {

    },
    responseType: 'blob'
  })
}
