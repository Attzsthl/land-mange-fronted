<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="状态">
                <el-select
                    v-model="form.year"
                    placeholder="年份选择"
                    style="width: 100px;">
                    <el-option label="2019" value="2019"/>
                    <el-option label="2018" value="2018"/>
                    <el-option label="2017" value="2017"/>
                    <el-option label="2016" value="2016"/>
                    <el-option label="2015" value="2015"/>
                </el-select>
            </el-form-item>
            <el-button
                  type="primary"
                  style="float:right"
                  @click="search">
                  查询
                </el-button>
        </el-form>

        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="templateName" label="表名" min-width="200">
                </el-table-column>
                <el-table-column prop="year" label="年份" width="100">
                </el-table-column>
                <el-table-column prop="reportingPeriod" label="上报期" width="200">
                </el-table-column>
                <el-table-column label="状态" width="100">
                   <template slot-scope="scope">
                    <el-tag :type="getTagType(scope.row.status)">
                      {{ getStatus(scope.row.status) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status == 1 || scope.row.status == 3"  type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row.templateId, scope.row.year,1)">修改</el-button>
                        <el-button v-if="scope.row.status == 3"  type="primary" icon="el-icon-info" circle @click="sendConfirm(scope.row)">重新申报</el-button>
                        <el-button v-if="scope.row.status == 4"  type="primary" icon="el-icon-info" circle @click="handleEdit(scope.row.templateId, scope.row.year,4)">查看</el-button>
                        <el-upload
                            v-if="scope.row.status == 0 || scope.row.status == 2"
                            class="upload-demo"
                            :multiple='false'
                            :auto-upload='true'
                            list-type='text'
                            :show-file-list='true'
                            :before-upload="beforeUpload"
                            action=''
                            :data="scope.row"
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
import { getTemplateImportPage, auditTemplate } from '@api/data.template.js'
import { getStatus, getTagType, getTownId } from '@api/enum.js'

export default {
  data () {
    return {
      templateId: '',
      year: '',
      templateData: [],
      form: {
        townId: '',
        year: ''
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
    this.form.townId = this.getCurTownId()
    this.fetchData()
  },
  computed: {
    getTagType () {
      return function (val) {
        return getTagType(val)
      }
    }
  },
  methods: {
    beforeUpload (file) {
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
      const fileObj = item.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      console.log(item)
      form.append('excel', fileObj)
      form.append('templateId', item.data.templateId)
      form.append('year', item.data.year)
      form.append('townId', this.form.townId)
      console.log(JSON.stringify(form))
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$axios.post('/api/readExcel', form, config).then((res) => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '上传失败'
        })
      })
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
    filterTag (value, row) {
      return row.tag === value
    },
    getStatus (val) {
      return getStatus(val)
    },
    handleEdit (templateId, year, status) {
      // 不同的模板跳转的页面不同
      if (templateId === '1') {
        this.$router.push({
          name: 'data-module-template-reg-population',
          query: {
            templateId: templateId,
            townId: this.form.townId,
            year: year,
            isAudit: false,
            status: status
          }
        })
      }
    },
    getCurTownId () {
      let id = getTownId()
      return id
    },
    sendConfirm (row) {
      let params = {
        templateId: row.templateId,
        year: row.year,
        townId: this.form.townId,
        status: 1
      }
      this.loading = true
      auditTemplate(params).then(res => {
        this.fetchData()
        this.$message.success('重新申报成功')
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
