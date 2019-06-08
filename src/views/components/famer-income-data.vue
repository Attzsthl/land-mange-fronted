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
                <el-table-column prop="operatorType" label="经营者类型" width="200">
                </el-table-column>
                <el-table-column prop="riceFileds" label="水稻地" min-width="100">
                </el-table-column>
                <el-table-column prop="vegetableFields" label="蔬菜地" min-width="100">
                </el-table-column>
                <el-table-column prop="orchardFields" label="果园地" min-width="100">
                </el-table-column>
                <el-table-column prop="fishPondFields" label="池塘" min-width="100">
                </el-table-column>
                 <el-table-column prop="otherFields" label="其他" min-width="100">
                </el-table-column>
        </el-table>
     </section>
</template>

<script>
import { getFarmIncomeExcel } from '@api/business.mange.js'

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
      getFarmIncomeExcel()
    }
  }
}
</script>
