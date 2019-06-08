<template>
    <d2-container>
        <el-row>
            <el-col :span="24">
                <h4>第一步：申请人基本信息审核</h4>
            </el-col>
        </el-row>
        <el-form
            ref="newForm"
            :model="form"
            label-width="150px">
            <el-row :gutter="80">
                <el-form-item
                    label="申请人信息:">
                </el-form-item>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="所在镇:">
                        {{ form.town }}
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="所在村:">
                        {{ form.village }}
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="户主(申请人)姓名:">
                        {{ form.householderName }}
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="身份证号码:">
                        {{ form.idCard }}
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="社保类型:">
                        {{ getSocialType(form.socialSecurityType) }}
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="股份类型:">
                        {{ getSocialType(form.stockType) }}
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="申请退出土地编号:">
                        {{ form.applyExitLandNo }}
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="土地面积:">
                        {{ form.applyExitLanArea }}
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="宅基地面积:">
                        {{ form.houseSiteArea }}
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="房屋建筑面积:">
                        {{form.houseArea }}
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-form-item
                    label="家庭成员信息:">
                </el-form-item>
            </el-row>
            <el-row :gutter="80" v-for="item in form.familyMemberList" :key="item.id">
                <el-col :span="6">
                    <el-form-item
                        label="姓名:">
                        {{ item.name }}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        label="与户主关系:">
                        {{ item.relation }}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        label="身份证号码:">
                        {{ item.idCard }}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                     <el-form-item
                        label="社保类型:">
                        {{ getSocialType(item.socialSecurityType) }}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        type="primary"
                        size="custom"
                        @click="nextStep">下一步：社保类型变更登记</el-button>
          </el-col>
        </el-row>
    </d2-container>
</template>

<script>
import { getExitApplyInfo } from '@api/exit.mange.js'
export default {
  data () {
    return {
      form: {
        town: '',
        village: '',
        householderName: '',
        idCard: '',
        socialSecurityType: '',
        stockType: '',
        applyExitLandNo: '',
        applyExitLanArea: '',
        houseSiteArea: '',
        houseArea: '',
        family: []
      },
      params: {

      },
      townList: [],
      villageList: []
    }
  },
  mounted () {
    this.params = this.$route.params
    this.fetchData()
  },
  methods: {
    nextStep () {
      this.$router.push({
        name: 'exit-mange-audit-step2',
        params: this.params
      })
    },
    fetchData () {
      getExitApplyInfo(this.params).then(res => {
        this.form = res
      })
    },
    getSocialType (val) {
      console.log(val)
      if (val === 'true') {
        return '城市型'
      } else {
        return '农村型'
      }
    }
  }
}
</script>
