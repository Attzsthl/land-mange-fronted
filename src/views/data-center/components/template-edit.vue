<template>
    <section>
       <!-- <el-dialog
        v-if="isDialog"
        :visible.sync="visible"
        append-to-body
        width="500px"
        class="template-edit"
        title="编辑模板">
        <el-table
            ref="templateEdit"
            :data="list"
            class="table">
            <el-table-column>
            </el-table-column>
       </el-dialog> -->
    </section>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      template: {}
    }
  }
}
</script>
