<template>
     <d2-container>
        <el-row>
            <el-col :span="24">
                <h4>第四步：地面附着物赔偿计算</h4>
            </el-col>
        </el-row>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="householderName" label="户主" width="100">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号码" width="200">
                </el-table-column>
                <el-table-column prop="applyExitLandNo" label="申请退出土地编号" min-width="200">
                </el-table-column>
                <el-table-column prop="applyExitLanArea" label="申请退出土地面积" width="200">
                </el-table-column>
                <el-table-column prop="compensation" label="补偿金额" min-width="100">
                      <template slot-scope="scope">
                        <el-input v-model="params.compensation" v-if="scope.row.compensation ==='' || scope.row.compensation === undefined || scope.row.compensation == null">
                        </el-input>
                        <span v-else>  {{ scope.row.compensation }} </span>
                    </template>
                </el-table-column>
                 <el-table-column label="登记日期" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.registerDate | FormatDate('yyyy-MM-dd') }}</span>
                    </template>
                </el-table-column>
        </el-table>
        <div class="pagination">
                <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                </el-pagination>
        </div>

         <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        type="primary"
                        size="custom"
                        @click="nextStep">下一步：失地拆迁登记</el-button>
          </el-col>
        </el-row>
     </d2-container>
</template>

<script>
import { getCompensationPage, saveCompensation } from '@api/exit.mange.js'
import { getExitStatus, getTagType } from '@api/enum.js'

export default {
  data () {
    return {
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
        pageSize: 5,
        total: 0
      },
      params: {
        id: '',
        compensation: ''
      }
    }
  },
  mounted () {
    this.params.id = this.$route.params.id
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
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getCompensationPage({
        ...this.pagination,
        ...this.params
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
    nextStep () {
      saveCompensation(this.params).then(res => {
        this.$router.push({
          name: 'exit-mange-audit-step5',
          params: this.params
        })
      })
    }
  }
}
</script>
