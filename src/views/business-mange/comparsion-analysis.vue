<template>
    <d2-container>
        <template slot="header"> <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: 10px">
            <el-form-item label="镇名">
                <el-select v-model="form.townId" placeholder="请选择">
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
            <el-button
                  type="primary"
                  style="float:right"
                  @click="getChartData">
                  分析
                </el-button>
        </el-form></template>
        <div  style="display:flex;width: 100%;height: 800px;">
            <div style="margin-left:10px">
                <ve-line :data="chartDataCollective" :settings="chartSettingsCollective" height="700px"  width="800px"></ve-line>
            </div>
            <div style="margin-right:10px">
                <ve-line :data="chartDataFarmer" :settings="chartSettingsFamer" height="700px" width="800px"></ve-line>
            </div>
        </div>
    </d2-container>
</template>

<script>
import list from '@/views/demo/charts/list/_mixin/list.js'
import { getResidenceIncomeChart } from '@api/business.mange.js'
export default {
  mixins: [
    list
  ],
  data () {
    return {
      filename: __filename,
      chartDataCollective: {
        columns: ['year', 'villageCollectiveIncome', 'toalIncome'],
        rows: [
          { 'year': '2019', 'yearendCulArea': 1393 },
          { 'year': '2018', 'yearendCulArea': 3530 },
          { 'year': '2017', 'yearendCulArea': 2923 },
          { 'year': '2016', 'yearendCulArea': 1723 },
          { 'year': '2015', 'yearendCulArea': 3792 },
          { 'year': '2014', 'yearendCulArea': 4593 }
        ]
      },
      chartDataFarmer: {
        columns: ['year', 'canUseIncome', 'dividend'],
        rows: [
          { 'year': '2019', 'yearendCulArea': 1393 },
          { 'year': '2018', 'yearendCulArea': 3530 },
          { 'year': '2017', 'yearendCulArea': 2923 },
          { 'year': '2016', 'yearendCulArea': 1723 },
          { 'year': '2015', 'yearendCulArea': 3792 },
          { 'year': '2014', 'yearendCulArea': 4593 }
        ]
      },
      form: {
        townId: '',
        indicators: ''
      },
      townNames: [],
      indicatorsTypes: [],
      chartSettingsCollective: {
        labelMap: {
          villageCollectiveIncome: '村集体收入',
          toalIncome: '年末集体资产总额'
        }
      },
      chartSettingsFamer: {
        labelMap: {
          canUseIncome: '农民人均可支配收入',
          dividend: '全年本村居民收入'
        }
      },
      townList: [],
      yearList: []
    }
  },
  mounted () {
    this.getChartData()
    this.townList = this.global.townList
    this.villageList = this.global.villageList
  },
  methods: {
    getChartData () {
      getResidenceIncomeChart(this.form).then(res => {
        console.log(res)
        this.chartDataCollective.rows = res
        this.chartDataFarmer.rows = res
      })
    }
  }

}
</script>
<style>
.container {
    width: 100%;
    height: 800px;
    /* .inner {
        border:1px solid  #000;
        margin-right: 10px;
        flex-grow: 1;
        // width: 100%;
        // height: 100%;
        &.right {
            flex-grow: 1;
        }
    } */
}

.line {
  position: absolute;
  /* // margin-left: 100px; */
  top: 20px;
  right:  20px;
  bottom: 20px;
  left: 20px;
}
</style>

<style lang="scss">
// .container {
//     width: 100%;
//     height: 800px;
//     .inner {
//         border:1px solid  #000;
//         margin-right: 10px;
//         flex-grow: 1;
//         // width: 100%;
//         // height: 100%;
//         &.right {
//             flex-grow: 1;
//         }
//     }
// }

// .line {
//   position: absolute;
//   // margin-left: 100px;
//   top: 20px;
//   right:  20px;
//   bottom: 20px;
//   left: 20px;
// }

</style>
