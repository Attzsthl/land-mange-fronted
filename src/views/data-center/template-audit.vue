<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="状态" prop="type">
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
            <el-form-item label="镇名">
                <el-input
                  v-model="form.town"
                   placeholder="请输入镇名"></el-input>
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
                <el-table-column prop="dataTemplate.templateName" label="表名" min-width="200">
                </el-table-column>
                <el-table-column prop="year" label="年份" width="100">
                </el-table-column>
                <el-table-column prop="townName" label="镇名" width="100">
                </el-table-column>
                <el-table-column prop="dataTemplate.reportingPeriod" label="上报期" width="200">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                  <template slot-scope="scope">
                    <el-tag :type="getTagType(scope.row.status)">
                      {{ getStatus(scope.row.status) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200" align="center">
                    <template slot-scope="scope">
                      <el-row>
                        <el-button v-if="scope.row.status == 0" type="warning" icon="el-icon-s-promotion" circle @click="sendUrgency(scope.row.dataTemplate.id, scope.row.year,scope.row.townId,2)">催报</el-button>
                        <el-button v-if="scope.row.status == 1" type="primary" icon="el-icon-edit" circle @click="reviewUploadData(scope.row.dataTemplate.id,scope.row.year,scope.row.townId,1)">审核</el-button>
                        <el-button v-if="scope.row.status == 1" type="danger" icon="el-icon-warning" circle @click="sendUrgency(scope.row.dataTemplate.id, scope.row.year,scope.row.townId,3)">退修</el-button>
                        <el-button v-if="scope.row.status == 2" type="info" disabled>等待</el-button>
                        <el-button v-if="scope.row.status == 3" type="info" disabled>等待</el-button>
                        <el-button v-if="scope.row.status == 4" type="primary" icon="el-icon-info" circle @click="reviewUploadData(scope.row.dataTemplate.id,scope.row.year,scope.row.townId,4)">查看</el-button>
                      </el-row>
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
import { getTemplateAuditPage, auditTemplate } from '@api/data.template.js'
import { getStatus, getTagType } from '@api/enum.js'

export default {
  data () {
    return {
      templateId: '',
      year: '',
      templateData: [],
      form: {
        townId: '',
        year: '',
        town: ''
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
  computed: {
    getTagType () {
      return function (val) {
        return getTagType(val)
      }
    }
  },
  methods: {
    setTemplateId (row) {
      this.templateId = row.templateId
      this.year = row.year
    },
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getTemplateAuditPage({
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
    handleEdit (templateId, year) {
      if (templateId === '1') {
        this.$router.push({
          name: 'data-module-template-reg-population',
          query: {
            templateId: templateId,
            year: year
          }
        })
      }
    },
    getStatus (val) {
      return getStatus(val)
    },
    sendUrgency (templateId, year, townId, status) {
      let params = {
        templateId: templateId,
        year: year,
        townId: townId,
        status: status
      }
      this.loading = true
      auditTemplate(params).then(res => {
        this.fetchData()
        if (status === 2) {
          this.$message.success('催报成功')
        } else {
          this.$message.success('退修成功')
        }

        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    reviewUploadData (templateId, year, townId, status) {
      if (templateId === '1') {
        this.$router.push({
          name: 'data-module-template-reg-population',
          query: {
            templateId: templateId,
            year: year,
            townId: townId,
            isAudit: true,
            status: status
          }
        })
      }
    }
  }
}
</script>
