import util from '@/libs/util.js'
const status = {
  '0': '未申报',
  '1': '已申报',
  '2': '催报',
  '3': '退修',
  '4': '审核通过'
}

const exitStatus = {
  '0': '未审核',
  '1': '审核通过',
  '2': '审核未通过',
  '3': '未审批',
  '4': '审批通过',
  '5': '审批未通过'
}

const tagType = {
  '0': 'warning',
  '1': '',
  '2': 'danger',
  '3': 'info',
  '4': 'success',
  '5': 'danger'
}

const operatorType = {
  0: '个体经营',
  1: '村集体经营',
  2: '租凭经营'
}

const townNames = [
  { 'id': '1', 'name': '横塘街道' },
  { 'id': '2', 'name': '虎丘区镇湖街道' },
  { 'id': '3', 'name': '浒墅关镇' },
  { 'id': '4', 'name': '通安镇' },
  { 'id': '5', 'name': '东渚镇' }
]

const stockType = {
  '0': '城市型',
  '1': '农村型'
}

const indicatorsTypes = [
  { 'id': '1', 'name': '耕地面积' },
  { 'id': '2', 'name': '高标准农田面积' },
  { 'id': '3', 'name': '粮食播种面积' },
  { 'id': '4', 'name': '蔬菜播种面积' },
  { 'id': '5', 'name': '全村宅基地面积' }
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

export function getExitStatus (val) {
  return exitStatus[val]
}

export function getOperatorType (val) {
  return operatorType[val]
}

export function getStockType (val) {
  return stockType[val]
}
