<template>
    <d2-container>
        <el-row>
            <el-col :span="24">
                <h4>最终审核</h4>
            </el-col>
        </el-row>
        <el-form
            ref="newForm"
            :model="form"
            label-width="150px">
            <el-row :gutter="80">
                <el-col :span="12">
                    <el-form-item
                    label="审核结论:">
                    <el-select
                            v-model="form.status"
                            placeholder="审核结果"
                            style="width: 100px;">
                            <el-option label="不通过" value="2"/>
                            <el-option label="审核通过" value="1"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="审核意见:">
                        <el-input
                            v-model="form.auditOpinion">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row :gutter="80">
                <el-col :span="12">
                    <el-form-item
                        label="审核人:">
                        <el-input v-model="form.auditName">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="审核日期:">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.auditDate" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        type="primary"
                        size="custom"
                        @click="nextStep">完成审核</el-button>
          </el-col>
        </el-row>
    </d2-container>
</template>

<script>
import { completeAudit } from '@api/exit.mange.js'
export default {
  data () {
    return {
      form: {
        id: '',
        status: '',
        auditOpinion: '',
        auditName: '',
        auditDate: ''
      },
      townList: [],
      villageList: []
    }
  },
  mounted () {
    this.form.id = this.$route.params.id
  },
  methods: {
    nextStep () {
      completeAudit(this.form).then(res => {
        this.$router.push({
          name: 'exit-mange-audit'
        })
      })
    }
  }
}
</script>
