<template>
  <d2-container :filename="filename">
    <template slot="header">分页</template>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
    <el-card shadow="never" class="d2-mb">
      <d2-markdown :source="doc"/>
    </el-card>
    <el-card shadow="never" class="d2-mb">
      <d2-highlight :code="code"/>
    </el-card>
    <template slot="footer">
      <d2-link-btn title="文档" link="https://doc.d2admin.fairyever.com/zh/ecosystem-d2-crud/"/>
    </template>
  </d2-container>
</template>

<script>
// import { BusinessTable1List } from '@api/demo.business.table.1'
import { getLandApprovePage } from '@api/common.js'

export default {
  data () {
    return {
      filename: __filename,
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
      ],
      data: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getLandApprovePage(this.pagination).then(res => {
        this.data = res.content
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
      // BusinessTable1List({
      //   ...this.pagination // 取出所有可遍历属性,copy到当前对想法中
      // }).then(res => {
      //   this.data = res.list
      //   this.pagination.total = res.page.total
      //   this.loading = false
      // }).catch(err => {
      //   console.log('err', err)
      //   this.loading = false
      // })
    }
  }
}
</script>
