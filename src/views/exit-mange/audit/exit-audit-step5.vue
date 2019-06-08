<template>
     <d2-container>
        <el-row>
            <el-col :span="24">
                <h4>第五步：失地拆迁登记</h4>
            </el-col>
        </el-row>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="householderName" label="户主" width="100">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号码" min-width="100">
                </el-table-column>
                <el-table-column prop="familyNum" label="家庭成员个数" width="100">
                </el-table-column>
                <el-table-column prop="houseSiteArea" label="宅基地面积" width="100">
                </el-table-column>
                <el-table-column prop='houseArea' label="农宅建筑面积" min-width="100">
                </el-table-column>
                <el-table-column prop="placeReason" label="安置原因" width="100">
                </el-table-column>
                <el-table-column prop="town" label="所在镇" width="100">
                </el-table-column>
                <el-table-column prop="village" label="所在村" width="100">
                </el-table-column>
                 <el-table-column label="登记日期" width="100">
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
                        @click="nextStep">下一步：填写审核意见</el-button>
          </el-col>
        </el-row>
     </d2-container>
</template>

<script>
import { getAnzhiPage } from '@api/exit.mange.js'
import { getExitStatus, getTagType } from '@api/enum.js'

export default {
  data () {
    return {
      compensation: '',
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

      }
    }
  },
  mounted () {
    this.params = this.$route.params
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
      getAnzhiPage({
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
        name: 'exit-mange-audit-step6',
        params: this.params
      })
    }
  }
}
</script>
