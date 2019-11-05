<template>
  <d2-container :filename="filename">
    <template slot="header">退出信息汇总</template>
    <d2-crud
      :columns="columns"
      :data="data"
      :loading="loading"
      :rowHandle="rowHandle"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
    <!-- <el-card shadow="never" class="d2-mb">
      <d2-markdown :source="doc"/>
    </el-card>
    <el-card shadow="never" class="d2-mb">
      <d2-highlight :code="code"/>
    </el-card>
    <template slot="footer">
      <d2-link-btn title="文档" link="https://doc.d2admin.fairyever.com/zh/ecosystem-d2-crud/"/>
    </template> -->
  </d2-container>
</template>

<script>
import doc from './doc.md'
import code from './code.js'
// import { BusinessTable1List } from '@api/demo.business.table.1'
import { getLandApprovePage } from '@api/common.js'

export default {
  data () {
    return {
      filename: __filename,
      doc,
      code,
      columns: [
        {
          title: '年份',
          key: 'id',
          width: 320
        },
        {
          title: '村',
          key: 'proCode'
        },
        {
          title: '镇',
          key: 'proName'
        },
        {
          title: '面积退地户数',
          key: 'applyDate'
        },
        {
          title: '退地户数',
          key: 'exitNum'
        },
        {
          title: '资金赔偿总额',
          key: 'compensate'
        },
        {
          title: '股份变更户数',
          key: 'stockNum'
        },
        {
          title: '社保变更人数',
          key: 'socialNum'
        }
        // ,
        // {
        //   title: '使用时间',
        //   key: 'dateTimeUse'
        // }
      ],
      data: [
        {
          id: '2018',
          proCode: '石湖村',
          proName: '横塘镇',
          applyDate: '110',
          exitNum: '42',
          compensate: '100000',
          stockNum: '32',
          socialNum: '126'
        },
        {
          id: '2018',
          proCode: '保卫村',
          proName: '横塘镇',
          applyDate: '120',
          exitNum: '48',
          compensate: '123536',
          stockNum: '48',
          socialNum: '144'
        },
        {
          id: '2018',
          proCode: '下山村',
          proName: '横塘镇',
          applyDate: '122',
          exitNum: '49',
          compensate: '157457',
          stockNum: '56',
          socialNum: '156'
        },
        {
          id: '2018',
          proCode: '吴工村',
          proName: '横塘镇',
          applyDate: '146',
          exitNum: '53',
          compensate: '162324',
          stockNum: '68',
          socialNum: '168'
        },
        {
          id: '2018',
          proCode: '青灯村',
          proName: '横塘镇',
          applyDate: '189',
          exitNum: '58',
          compensate: '189342',
          stockNum: '48',
          socialNum: '148'
        }
      ],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
      // rowHandle: {
      //   custom: [
      //     {
      //       text: '自定义按钮',
      //       type: 'warning',
      //       size: 'small',
      //       emit: 'custom-emit-1'
      //     }
      //   ]
      // }
    }
  },
  mounted () {
    // this.fetchData()
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
