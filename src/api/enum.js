import util from '@/libs/util.js'
const status = {
  '0': '未申报',
  '1': '已申报',
  '2': '催报',
  '3': '退修',
  '4': '审核通过'
}

const tagType = {
  '0': 'warning',
  '1': '',
  '2': 'danger',
  '3': 'info',
  '4': 'success'
}

const townNames = [
  { 'id': '1', 'name': '横塘街道' },
  { 'id': '2', 'name': '虎丘区镇湖街道' },
  { 'id': '3', 'name': '浒墅关镇' },
  { 'id': '4', 'name': '通安镇' },
  { 'id': '5', 'name': '东渚镇' }
]

const indicatorsTypes = [
  { 'id': '1', 'name': '耕地面积' }
]

const townId = util.cookies.get('townId')

export function getStatus (val) {
  return status[val]
}

export function getTagType (val) {
  return tagType[val]
}

export function getTownId () {
  return townId
}

export function getTownNames () {
  return townNames
}

export function getIndicatorsTypes () {
  return indicatorsTypes
}
