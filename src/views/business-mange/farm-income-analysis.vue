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
                  @click="search">
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
                <ve-histogram :data="histogramData" v-if="showChart == 0" v-bind="pubSetting" :settings="chartSettings"></ve-histogram>
              </div>
            </el-tab-pane>
            <el-tab-pane
                style="height:800px"
                label="数据展示"
                name="second"
            >
                <FarmIncomeData
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
import FarmIncomeData from '@/views/components/famer-income-data'
import { getFarmIncomePage, getFarmTypeChart } from '@api/business.mange.js'

export default {
  mixins: [
    list
  ],
  components: {
    FarmIncomeData
  },
  data () {
    this.chartSettings = {
      labelMap: {
        selfMangeArea: '个体经营',
        villageArea: '集体经营',
        retalArea: '租凭机构',
        averageIncome: '每亩平均收入'
      }
    }
    return {
      form: {
        town: '1',
        village: '',
        year: '2019'
      },
      analysisTypes: [
        { 'id': 0, 'name': '农用地使用分析' },
        { 'id': 1, 'name': '农用地收入分析' }
      ],
      showChart: 0,
      townList: [],
      yearList: [],
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
      histogramData: {
        columns: ['landType', 'selfMangeArea', 'villageArea', 'retalArea'],
        rows: [

        ]
      },
      chartData: {}
    }
  },
  mounted () {
    this.fetchData()
    this.townList = this.global.townList
    this.villageList = this.global.villageList
    this.yearList = this.global.yearList
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
      getFarmIncomePage({
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
      this.getChartData()
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
      getFarmTypeChart(this.form).then(res => {
        this.chartData = res
        this.histogramData.rows = this.chartData.typeChart
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
