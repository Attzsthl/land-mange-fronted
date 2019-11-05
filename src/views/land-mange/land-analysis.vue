<template>
  <d2-container :filename="filename">
      <template slot="header">
           <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item
                >
                选择镇:
                <el-select
                    v-model="form.townId"
                    placeholder="请选择">
                        <el-option
                            v-for="item in townNames"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                </el-select>
            </el-form-item>
            <el-form-item
                label="选择分析类型:">
                <el-select
                    v-model="form.indicators"
                    placeholder="请选择">
                        <el-option
                            v-for="item in indicatorsTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item
                style="float:right">
                <el-button
                    type="primary"
                    @click="getChartData">
                    分析
                </el-button>
            </el-form-item>
        </el-form>
      </template>
    <div class="inner">
      <ve-line :data="chartData" :settings="chartSettings" height="700px"></ve-line>
    </div>
  </d2-container>
</template>

<script>
import list from '@/views/demo/charts/list/_mixin/list.js'
import { getTownNames, getIndicatorsTypes } from '@/api/enum.js'
import { getAnalysisData } from '@/api/land.mange.js'
export default {
  mixins: [
    list
  ],
  data () {
    return {
      filename: __filename,
      chartData: {
        columns: ['year', 'yearendCulArea'],
        rows: [
          { 'year': '2014', 'yearendCulArea': 4593 },
          { 'year': '2015', 'yearendCulArea': 3792 },
          { 'year': '2016', 'yearendCulArea': 1723 },
          { 'year': '2017', 'yearendCulArea': 2923 },
          { 'year': '2018', 'yearendCulArea': 3530 },
          { 'year': '2019', 'yearendCulArea': 1393 }
        ]
      },
      rows1: [
        { 'year': '2014', 'yearendCulArea': 2421 },
        { 'year': '2015', 'yearendCulArea': 3131 },
        { 'year': '2016', 'yearendCulArea': 2134 },
        { 'year': '2017', 'yearendCulArea': 2134 },
        { 'year': '2018', 'yearendCulArea': 1314 },
        { 'year': '2019', 'yearendCulArea': 4311 }
      ],
      rows2: [
        { 'year': '2014', 'yearendCulArea': 231 },
        { 'year': '2015', 'yearendCulArea': 453 },
        { 'year': '2016', 'yearendCulArea': 467 },
        { 'year': '2017', 'yearendCulArea': 213 },
        { 'year': '2018', 'yearendCulArea': 678 },
        { 'year': '2019', 'yearendCulArea': 789 }
      ],
      rows3: [
        { 'year': '2014', 'yearendCulArea': 536 },
        { 'year': '2015', 'yearendCulArea': 131 },
        { 'year': '2016', 'yearendCulArea': 367 },
        { 'year': '2017', 'yearendCulArea': 126 },
        { 'year': '2018', 'yearendCulArea': 652 },
        { 'year': '2019', 'yearendCulArea': 353 }
      ],
      form: {
        townId: '',
        indicators: ''
      },
      townNames: [],
      indicatorsTypes: [],
      chartSettings: {
        labelMap: {
          year: '年份',
          yearendCulArea: '耕地面积'
        }
      }
    }
  },
  mounted () {
    this.townNames = getTownNames()
    this.indicatorsTypes = getIndicatorsTypes()
    // this.getChartData()
  },
  methods: {
    search () {

    },
    getChartData () {
      console.log(this.form.indicators)
      if (this.form.indicators === '') {
        this.chartData.rows = this.rows1
      }
      if (this.form.indicators === '1') {
        this.chartData.rows = this.rows2
      }
      if (this.form.indicators === '2') {
        this.chartData.rows = this.rows3
      }
      // getAnalysisData(this.form).then(res => {
      //   this.chartData.rows = res
      // })
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
  height: 100%
}
</style>
