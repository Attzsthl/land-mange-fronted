<template>
  <d2-container>
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
    </el-dialog>-->
    <el-row

      >
       <el-col :span="3"
          v-for="(item,index) in list"
          :key="index">
          <el-col :span="24"  v-if="item">
            <el-input v-model="form[index].columnName" type="text"  placeholder="请输入参考里程" />
          </el-col>
      </el-col>
    </el-row>
    <el-row>
        <el-col :span="24" style="text-align: center; margin-top: 15px;">
            <el-button
                type="primary"
                size="custom"
                @click="editSubmit">确认修改</el-button>
        </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import { getTemplateDetail, editTemplateSubmit } from '@api/data.template.js'
export default {
  data () {
    return {
      list: [],
      form: [],
      template: {},
      tableName: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      const { tableName } = this.$route.query
      this.tableName = tableName
      let query = { tableName: tableName }
      debugger
      getTemplateDetail(query).then(data => {
        data.forEach(element => {
          this.list.push(element.columnName)
        })
        this.form = data
      })
    },
    editSubmit () {
      let query = {
        tableName: this.tableName,
        templates: this.form
      }
      editTemplateSubmit(query).then(() => {
        this.$message.success('修改成功')
        this.loadData()
      })
    }
  }
}
</script>
