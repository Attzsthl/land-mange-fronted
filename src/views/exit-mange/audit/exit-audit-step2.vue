<template>
     <d2-container>
        <el-row>
            <el-col :span="24">
                <h4>第二步：社保类型变更登记</h4>
            </el-col>
        </el-row>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号码" min-width="100">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100">
                </el-table-column>
                <el-table-column label="出生年月" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.bornDate | FormatDate('yyyy-MM-dd') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="relation" label="与户主关系" min-width="100">
                </el-table-column>
                <el-table-column prop="presentSocialType" label="当前社保类型" width="100">
                   <template slot-scope="scope">
                        <span> {{ getSocialType(scope.row.socialSecurityType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="changeType" label="变更类型" width="100">
                   <template slot-scope="scope">
                        <span> {{ getSocialType(scope.row.changeType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="town" label="所在镇" width="100">
                </el-table-column>
                <el-table-column prop="village" label="所在村" width="100">
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
                        @click="nextStep">下一步：股份类型变更登记</el-button>
          </el-col>
        </el-row>
     </d2-container>
</template>

<script>
import { getSocialChangePage } from '@api/exit.mange.js'
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
        pageSize: 5,
        total: 0
      },
      params: {
        id: ''
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
    getSocialType (val) {
      if (val === 0) {
        return '城市型'
      } else {
        return '农村型'
      }
    },
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getSocialChangePage({
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
      this.$router.push({
        name: 'exit-mange-audit-step3',
        params: this.params
      })
    }
  }
}
</script>
