<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="状态" prop="type">
                <el-select
                    v-model="form.status"
                    placeholder="状态选择"
                    style="width: 100px;">
                    <el-option label="未审核" value="0"/>
                    <el-option label="审核通过" value="2"/>
                    <el-option label="审核不通过" value="3"/>
                </el-select>
            </el-form-item>
            <el-form-item label="镇名">
                <el-select v-model="form.town" placeholder="请选择">
                    <el-option
                            v-for="item in townList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="村名">
                <el-select v-model="form.village" placeholder="请选择">
                            <el-option
                                v-for="item in villageList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
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
                <el-table-column prop="projectNo" label="项目编号" width="200">
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称" min-width="100">
                </el-table-column>
                <el-table-column label="申请时间" width="100">
                     <template slot-scope="scope">
                        <span>{{ scope.row.applyDate | FormatDate('yyyy-MM-dd') }}</span>
                    </template>
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
                        <el-button v-if="scope.row.status == 0"  type="primary" icon="el-icon-info" circle @click="auditEditApply(scope.row.id,scope.row.status)">审批</el-button>
                        <el-button v-else  type="primary" icon="el-icon-info" circle @click="auditEditApply(scope.row.id,scope.row.status)">查看</el-button>
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
import { getExitProPage } from '@api/exit.mange.js'
import { getExitStatus, getTagType } from '@api/enum.js'

export default {
  data () {
    return {
      year: '',
      templateData: [],
      form: {
        town: '',
        status: '',
        village: ''
      },
      townList: [],
      villageList: [],
      loading: true,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
    this.townList = this.global.getTownNames()
  },
  computed: {
    getTagType () {
      return function (val) {
        return getTagType(val)
      }
    }
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getExitProPage({
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
      return getExitStatus(val)
    },
    auditEditApply (id, status) {
      this.$router.push({
        name: 'exit-mange-audit-step1',
        params: {
          id: id,
          status: status
        }
      })
    }
  }
}
</script>
