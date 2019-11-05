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
    <!-- <template slot="header">退出信息分析</template> -->
    <div class="inner">
      <ve-histogram :data="chartData" v-bind="pubSetting"></ve-histogram>
    </div>
  </d2-container>
</template>

<script>
import list from '@/views/demo/charts/list/_mixin/list.js'
export default {
  mixins: [
    list
  ],
  data () {
    return {
      filename: __filename,
      form: {
        townId: '',
        indicators: ''
      },
      chartData: {
        columns: ['退出村', '退出面积', '退出户数', '赔偿金额'],
        rows: [
          { '退出村': '石湖村', '退出面积': 110, '退出户数': 42, '赔偿金额': 10 },
          { '退出村': '保卫村', '退出面积': 120, '退出户数': 48, '赔偿金额': 12 },
          { '退出村': '下山村', '退出面积': 122, '退出户数': 49, '赔偿金额': 15 },
          { '退出村': '吴工村', '退出面积': 146, '退出户数': 53, '赔偿金额': 16 },
          { '退出村': '青灯村', '退出面积': 189, '退出户数': 58, '赔偿金额': 19 }
        ]
      }
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
  height:100%
}
</style>
