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
                <el-table-column prop="town" label="所在镇" width="200">
                </el-table-column>
                <el-table-column prop="village" label="所在村" min-width="100">
                </el-table-column>
                <el-table-column label="租凭经营" min-width="100">
                    <el-table-column prop="rentalMangeCount" label="经营者数量" width="100">
                    </el-table-column>
                    <el-table-column prop="rentalMangeArea" label="经营总面积" width="100">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="农户经营" min-width="100">
                    <el-table-column prop="selfMangeCount" label="经营者数量" width="100">
                    </el-table-column>
                    <el-table-column prop="selfMangeArea" label="经营总面积" width="100">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="集体经营" min-width="100">
                    <el-table-column prop="villageMangeCount" label="经营者数量" width="100">
                    </el-table-column>
                    <el-table-column prop="villageMangeArea" label="经营者总面积" width="100">
                    </el-table-column>
                </el-table-column>
        </el-table>
     </section>
</template>

<script>
import { getBusinessAnalysisExcel } from '@api/business.mange.js'

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
      getBusinessAnalysisExcel()
    }
  }
}
</script>
