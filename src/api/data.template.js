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

export function getRegPopulationPage (params) {
  return request({
    url: '/reg-population-page',
    method: 'get',
    params
  })
}

export function saveRegPopulation (params) {
  return request({
    url: '/save-reg-population',
    method: 'post',
    data: params
  })
}

export function deleteRegPopulation (params) {
  return request({
    url: '/delete-reg-population',
    method: 'post',
    params
  })
}

export function getTemplateAuditPage (params) {
  return request({
    url: '/template-audit-page',
    method: 'post',
    data: params
  })
}

export function auditTemplate (params) {
  return request({
    url: '/template-audit',
    method: 'post',
    data: params
  })
}
