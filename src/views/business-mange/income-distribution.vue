<template>
     <d2-container>
         <template slot="header">
             <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="镇名">
                <el-select v-model="form.town" placeholder="请选择">
                    <el-option
                            v-for="item in townList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="村名">
                 <el-input v-model="form.village">
                 </el-input>
            </el-form-item>
            <el-form-item label="年份">
                <el-select v-model="form.year" placeholder="请选择">
                    <el-option
                            v-for="item in yearList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
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
        </template>
        <el-button
            style="float:right;margin-right:10px"
            type="primary"
            @click="exportExcel">
            导出
        </el-button>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" style="margin-top:10px">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="totalNetIncome" label="净收益总额" width="200">
                </el-table-column>
                <el-table-column prop="vca" label="土地经营收入" min-width="100">
                </el-table-column>
                <el-table-column prop="shareholderAllocation" label="股东分配额" min-width="100">
                </el-table-column>
                <el-table-column prop="currentRetention" label="本期留存金额" min-width="100">
                </el-table-column>
                <el-table-column prop="lta" label="上期转额" min-width="100">
                </el-table-column>
                <el-table-column prop="rsTolNum" label="农村型股份总额" min-width="100">
                </el-table-column>
                <el-table-column prop="ruralUnitPrice" label="农村型股份单价" min-width="100">
                </el-table-column>
                <el-table-column prop="csTolNum" label="城市型股份总额" min-width="100">
                </el-table-column>
                <el-table-column prop="ctup" label="城市型股份单价" min-width="100">
                </el-table-column>
                <el-table-column prop="town" label="所在镇" min-width="100">
                </el-table-column>
                <el-table-column prop="village" label="所在村" min-width="100">
                </el-table-column>
                <el-table-column prop="year" label="年份" min-width="100">
                </el-table-column>
        </el-table>
        <div class="pagination">
                <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                </el-pagination>
        </div>
     </d2-container>
</template>

<script>
import { getBusinessExcel, getIncomeDistriPage } from '@api/business.mange.js'
import { getOperatorType } from '@api/enum.js'

export default {
  data () {
    return {
      year: '',
      templateData: [],
      form: {
        town: '',
        status: '',
        village: '',
        operatorName: '',
        operatorType: ''
      },
      townList: [],
      villageList: [],
      yearList: [],
      loading: true,
      pagination: {
        page: 0,
        size: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
    this.townList = this.global.townList
    this.villageList = this.global.villageList
    this.yearList = this.global.yearList
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage - 1
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getIncomeDistriPage({
        ...this.pagination,
        ...this.form
      }).then(res => {
        this.templateData = res.content
        this.pagination.total = res.totalElements
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
    getStatus (val) {
      return getOperatorType(val)
    },
    exportExcel () {
      getBusinessExcel()
    }
  }
}
</script>
