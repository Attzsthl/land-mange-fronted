<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="状态" prop="type">
                <el-select
                    v-model="form.type"
                    placeholder="年份选择"
                    style="width: 100px;">
                    <el-option label="2019" value="1"/>
                    <el-option label="2017" value="2"/>
                    <el-option label="2016" value="3"/>
                    <el-option label="2015" value="4"/>
                    <el-option label="2014" value="5"/>
                </el-select>
            </el-form-item>
        </el-form>

        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="templateName" label="表名" min-width="200">
                </el-table-column>
                <el-table-column prop="year" label="年份" width="100">
                </el-table-column>
                <el-table-column prop="reportingPeriod" label="上报期" width="200">
                </el-table-column>
                <el-table-column prop="uploadStatus" label="状态" width="100">
                </el-table-column>
                <el-table-column label="操作" min-width="200" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
                        <el-upload
                            v-if="scope.row.status == 0"
                            class="upload-demo"
                            :multiple='false'
                            :auto-upload='true'
                            list-type='text'
                            :show-file-list='true'
                            :before-upload="beforeUpload"
                            action=''
                            :limit="1"
                            :on-exceed="handleExceed"
                            :http-request="uploadFile" >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
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
import { getTemplateImportPage, uploadExcel } from '@api/data.template.js'

export default {
  data () {
    return {
      templateId: '1',
      templateData: [],
      form: {
        townId: '1'
      },
      loading: true,
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
    beforeUpload (file) {
      console.log('beforeUpload')
      console.log(file.type)
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return (isText | isTextComputer)
    },
    // 上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
    // 上传文件
    uploadFile (item) {
      console.log(item)
      const fileObj = item.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('excel', fileObj)
      form.append('templateId', this.templateId)
      console.log(JSON.stringify(form))
      // let formTwo = JSON.stringify(form)
      // uploadExcel(form).then(response => {
      //   console.log('MediaAPI.upload')
      //   console.log(response)
      //   this.$message.info('文件：' + fileObj.name + '上传成功')
      // })
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$axios.post('/api/readExcel', form, config).then((res) => {
        alert(res)
        this.passData('hello')
      })

    },
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
      getTemplateImportPage({
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
    }
  }
}
</script>
