<template>
     <section>
        <el-button
            style="float:right;margin-right:10px"
            type="primary"
            @click="exportExcel">
            导出
        </el-button>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" style="margin-top:10px">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="plotNumber" label="地块编号" width="200">
                </el-table-column>
                <el-table-column prop="contractedArea" label="承包地面积" min-width="100">
                </el-table-column>
                <el-table-column prop="riceFields" label="水稻田" min-width="100">
                </el-table-column>
                <el-table-column prop="vegetableField" label="蔬菜地" min-width="100">
                </el-table-column>
                 <el-table-column prop="orchard" label="果园" min-width="100">
                </el-table-column>
                 <el-table-column prop="fishPond" label="鱼塘" min-width="100">
                </el-table-column>
                 <el-table-column prop="operatorName" label="经营者" min-width="100">
                </el-table-column>
                <el-table-column  label="经营者类型" width="100">
                  <template slot-scope="scope">
                      {{ getStatus(scope.row.operatorType) }}
                  </template>
                </el-table-column>
                 <el-table-column prop="totalNetIncome" label="净收益总额" min-width="100">
                </el-table-column>
                 <el-table-column prop="town" label="所在镇" min-width="100">
                </el-table-column>
                 <el-table-column prop="village" label="所在村" min-width="100">
                </el-table-column>
                 <el-table-column prop="year" label="年度" min-width="100">
                </el-table-column>
        </el-table>
     </section>
</template>

<script>
import { getYearAnalysisExcel } from '@api/business.mange.js'

export default {
  props: {
    templateData: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    exportExcel () {
      getYearAnalysisExcel()
    },
    getStatus (val) {
      if (val === 0) {
        return '个体经营'
      } else if (val === 1) {
        return '集体经营'
      } else if (val === 2) {
        return '租凭经营'
      }
    }
  }
}
</script>
