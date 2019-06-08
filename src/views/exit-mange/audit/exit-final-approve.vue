<template>
    <d2-container>
        <template slot="header">最终审批</template>
        <div class="container" style="display:flex">
            <div class="inner left">
                <el-row :gutter="180">
                    <el-col :span="24" style="text-align: center; margin-top: 15px">
                        <el-button type="text" size="medium" @click="toApplyInfo">查看申请人基本信息</el-button>
                    </el-col>
                </el-row>
                 <el-row :gutter="180">
                    <el-col :span="24" style="text-align: center; margin-top: 50px">
                        <el-button type="text" size="medium" @click="toSocialType">查看申请人社保变更信息</el-button>
                    </el-col>
                </el-row>
                 <el-row :gutter="180">
                    <el-col :span="24" style="text-align: center; margin-top: 50px">
                        <el-button type="text" size="medium" @click="toStockType">查看申请人股份类型变更信息</el-button>
                    </el-col>
                </el-row>
                 <el-row :gutter="180">
                    <el-col :span="24" style="text-align: center; margin-top: 50px">
                        <el-button type="text" size="medium" @click="toCompensation">查看申请人地面附着物赔偿信息</el-button>
                    </el-col>
                </el-row>
                 <el-row :gutter="180">
                    <el-col :span="24" style="text-align: center; margin-top: 50px">
                        <el-button type="text" size="medium" @click="toRelocates">查看申请人失地拆迁登记信息</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="inner right">
                <el-form
                    ref="newForm"
                    :model="form"
                    style="padding-left: 200px">
                    <el-row :gutter="80">
                        <el-col :span="24" style="margin-top: 10px">
                            <el-form-item
                            label="审批结论:">
                                <el-select
                                    v-model="form.status"
                                    placeholder="审批结果"
                                    style="width: 100px;">
                                    <el-option label="审批通过" value="4"/>
                                    <el-option label="审批不通过" value="5"/>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="80">
                        <el-col :span="12" style="margin-top: 30px">
                            <el-form-item
                                label="审批意见:">
                                <el-input
                                    v-model="form.auditOpinion">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="80">
                        <el-col :span="12" style="text-align: center; margin-top: 30px">
                            <el-form-item
                                label="审批人:">
                                <el-input v-model="form.auditName">
                                </el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="12"  style="text-align: center; margin-top: 30px">
                            <el-form-item
                                label="审批日期:">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.auditDate" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
         <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        type="primary"
                        size="custom"
                        @click="sendSuccess">审批通过</el-button>
          </el-col>
        </el-row>

    </d2-container>
</template>

<script>
import { completeApprove } from '@api/exit.mange.js'
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
      params: {

      }
    }
  },
  mounted () {
    this.params = this.$route.params
    this.form.id = this.$route.params.id
  },
  methods: {
    toApplyInfo () {
      this.$router.push({
        name: 'exit-mange-audit-step1',
        params: this.params
      })
    },
    toSocialType () {
      this.$router.push({
        name: 'exit-mange-audit-step2',
        params: this.params
      })
    },
    toStockType () {
      this.$router.push({
        name: 'exit-mange-audit-step3',
        params: this.params
      })
    },
    toCompensation () {
      this.$router.push({
        name: 'exit-mange-audit-step4',
        params: this.params
      })
    },
    toRelocates () {
      this.$router.push({
        name: 'exit-mange-audit-step5',
        params: this.params
      })
    },
    sendSuccess () {
      completeApprove(this.form).then(res => {
        this.$message.success('审批通过')
        this.$router.push({
          name: 'exit-mange-approve'
        })
      })
    }
  }

}
</script>
<style lang="scss">
.container {
    width: 100%;
    height: 500px;
    .inner {
        border:1px solid  #000;
        margin-right: 10px;
        flex-grow: 1;

        &.right {
            flex-grow: 1;
        }
    }
}

</style>
