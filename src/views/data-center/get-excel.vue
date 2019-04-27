<template>
<div>
  <el-button
        type="primary"
        @click="toGetExcel">获取表格</el-button>
</div>
</template>

<script>
import { getExcel } from '@api/common.js'
export default {
  data () {
    return {
      columns: [
        {
          title: '卡密',
          key: 'id',
          width: 320
        },
        {
          title: '面值',
          key: 'proCode'
        },
        {
          title: '管理员',
          key: 'proName'
        },
        {
          title: '创建时间',
          key: 'applyDate'
        }
        // ,
        // {
        //   title: '使用时间',
        //   key: 'dateTimeUse'
        // }
      ]
    }
  },
  methods: {
    toGetExcel () {
      getExcel()
      // axios({
      //   url: '/api/getExcel',
      //   method: 'post',
      //   params: {

      //   },
      //   responseType: 'arraybuffer'
      // }).then(res => {
      // }).catch((error) => {
      //   this.$message({
      //     type: 'warning',
      //     message: error
      //   })
      // })
      // const columns = [
      //   {
      //     label: '姓名',
      //     prop: 'name'
      //   },
      //   {
      //     label: '年龄',
      //     prop: 'age'
      //   }
      // ]
      // const data = [
      //   {
      //     name: 'lucy',
      //     age: 24
      //   },
      //   {
      //     name: 'bob',
      //     age: 26
      //   }
      // ]
      // this.$export.csv({
      //   columns,
      //   data
      // })
    },
    download (data) {
      if (!data) {

      } else {
        var blob = new Blob([data], { type: 'application/application/vnd.ms-excel;charset=utf-8' })
        var url = window.URL.createObjectURL(blob)
        var aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = url
        aLink.setAttribute('download', 'UserInfo 2019-04-22.xlsx')
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink) // 下载完成移除元素
        window.URL.revokeObjectURL(url)
      }
    }
  }
}
</script>
