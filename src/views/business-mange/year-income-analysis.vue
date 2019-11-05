<template>
  <d2-container :filename="filename">
    <template slot="header">
      <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: 10px">
            <el-form-item label="镇名">
                <el-select v-model="form.town" placeholder="请选择">
                    <el-option
                            v-for="item in townList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="村名">
                <el-select v-model="form.village" placeholder="请选择">
                            <el-option
                                v-for="item in villageList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分析类型">
                <el-select @change="show" placeholder="请选择">
                            <el-option
                                v-for="item in analysisTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-button
                  type="primary"
                  style="float:right"
                  @click="getChartData">
                  查询
                </el-button>
        </el-form>
    </template>
    <el-tabs
            v-model="editableTabsValue"
           >
            <el-tab-pane
                style="height:800px"
                label="数据分析"
                name="first"
            >
              <div class="inner" >
                <ve-line :data="chartData" v-bind="pubSetting" :settings="chartSettings"></ve-line>
              </div>
            </el-tab-pane>
            <el-tab-pane
                style="height:800px"
                label="数据展示"
                name="second"
            >
                <YearIncomeData
                  :templateData="templateData"
                  :loading ="loading" />
                <div class="pagination">
                    <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
  </d2-container>
</template>

<script>
import list from '@/views/demo/charts/list/_mixin/list.js'
import YearIncomeData from '@/views/components/year-income-data'
import { getNetIncomePage, getYearAnalysisChart } from '@api/business.mange.js'

export default {
  mixins: [
    list
  ],
  components: {
    YearIncomeData
  },
  data () {
    this.chartSettings = {
      labelMap: {
        selfTotalIncome: '个人经营',
        villageTotalIncome: '村集体经营',
        retalTotalIncome: '租凭经营'
      }
    }
    return {
      form: {
        town: '1',
        village: ''
      },
      analysisTypes: [
        { 'id': 0, 'name': '农用地使用分析' },
        { 'id': 1, 'name': '农用地收入分析' }
      ],
      showChart: 0,
      townList: [],
      pagination: {
        page: 0,
        size: 10,
        total: 0
      },
      loading: true,
      templateData: [],
      villageList: [],
      editableTabsValue: 'first',
      filename: __filename,
      chartData: {
        columns: ['year', 'selfTotalIncome', 'villageTotalIncome', 'retalTotalIncome'],
        rows: [
          { 'year': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { 'year': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { 'year': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { 'year': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { 'year': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { 'year': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  mounted () {
    this.fetchData()
    this.townList = this.global.townList
    this.villageList = this.global.villageList
    this.getChartData()
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage - 1
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getNetIncomePage({
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
      this.loading = true
      this.fetchData()
    },
    show (val) {
      if (val === 1) {
        this.histogramData.columns = ['operatorType', 'averageIncome']
        this.histogramData.rows = this.chartData.incomeChart
      } else {
        this.histogramData.columns = ['landType', 'selfMangeArea', 'villageArea', 'retalArea']
        this.histogramData.rows = this.chartData.typeChart
      }
    },
    getChartData () {
      getYearAnalysisChart(this.form).then(res => {
        this.chartData.rows = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
  position: absolute;
  top: 20px;
  right:  20px;
  bottom: 20px;
  left: 20px;
  width: 100%;
  height: 100%;
}
</style>
