import request from '@/plugin/axios'
export function getTemplatePage (params) {
  return request({
    url: '/template-page',
    method: 'get',
    params
  })
}

export function getTemplateDetail (params) {
  return request({
    url: '/template-edit',
    method: 'get',
    params
  })
}

export function editTemplateSubmit (params) {
  return request({
    url: '/template-edit-submit',
    method: 'post',
    data: params
  })
}

export function getTemplateImportPage (params) {
  return request({
    url: '/template-import-page',
    method: 'get',
    params
  })
}

export function uploadExcel (params) {
  return request({
    url: '/readExcel',
    method: 'post',
    data: params
  })
}
