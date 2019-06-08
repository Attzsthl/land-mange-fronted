<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <!-- <el-form-item label="模板名称">
                <el-input
                    v-model="templateName"
                    style="width: 200px;"/>
            </el-form-item> -->

            <!-- <el-form-item>
                <el-button
                    type="primary"
                    @click="search">
                    <d2-icon name="refresh"/>
                    查询
                </el-button>
                <el-button
                    type="primary"
                    @click="clear">
                    清空
                </el-button>
            </el-form-item> -->
        </el-form>

        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="templateName" label="模板名称" min-width="200">
                </el-table-column>
                <el-table-column label="操作" width="400" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-s-promotion" circle  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button type="warning" icon="el-icon-s-promotion" circle  @click="getExcel(scope.$index, scope.row)">导出</el-button>
                        <el-button type="danger" icon="el-icon-s-promotion" circle @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <div class="pagination">
                <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                </el-pagination>
        </div>
     </d2-container>
</template>

<script>
import { getTemplatePage, getTemplateExcel } from '@api/data.template.js'

export default {
  data () {
    return {
      templateName: '',
      templateData: [],
      form: {
        templateName: ''
      },
      loading: true,
      pagination: {
        page: 0,
        size: 11,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    clear () {

    },
    addTemplate () {

    },
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    // 获取 easy-mock 的模拟数据
    fetchData () {
      this.loading = true
      getTemplatePage({
        ...this.pagination,
        ...this.form
      }).then(res => {
        this.templateData = res.content
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    search () {
      this.is_search = true
      this.fetchData()
    },
    dateFormat (row, column, cellValue) {
      var date = new Date(row.applyDate)// long转换成date
      var year = date.getFullYear().toString()
      var month = (date.getMonth() + 1)
      var day = date.getDate().toString()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      // var hours = date.getHours()
      // var minutes = date.getMinutes()
      return year + '-' + month + '-' + day
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      console.log('row.id' + row.id)
      this.$router.push({
        name: 'data-module-template-edit',
        query: {
          tableName: row.tableName
        }
      })
    },
    handleDelete (index, row) {
      this.idx = index
      this.delVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit () {
      this.$set(this.tableData, this.idx, this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    },
    getExcel () {
      console.log('get exel')
      getTemplateExcel()
    }
  }
}
</script>
