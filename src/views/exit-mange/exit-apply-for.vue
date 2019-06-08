<template>
    <d2-container>
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
                        <el-select v-model="form.town" placeholder="请选择">
                           <el-option
                            v-for="item in townList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"/>
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="所在村:">
                        <el-select v-model="form.village" placeholder="请选择">
                            <el-option
                                v-for="item in villageList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="户主(申请人)姓名:">
                        <el-input
                            v-model="form.householderName">
                        </el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="身份证号码:">
                        <el-input
                            v-model="form.idCard">
                        </el-input>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="社保类型:">
                        <el-select
                            v-model="form.socialSecurityType"
                            placeholder="状态选择"
                            style="width: 100px;">
                            <el-option label="城市型" value="0"/>
                            <el-option label="农村型" value="1"/>
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="股份类型:">
                        <el-select
                            v-model="form.stockType"
                            placeholder="状态选择"
                            style="width: 100px;">
                            <el-option label="城市型" value="0"/>
                            <el-option label="农村型" value="1"/>
                        </el-select>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="申请退出土地编号:">
                        <el-input
                            v-model="form.applyExitLandNo">
                        </el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="土地面积:">
                        <el-input
                            v-model="form.applyExitLanArea">
                        </el-input>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="宅基地面积:">
                        <el-input
                            v-model="form.houseSiteArea">
                        </el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="房屋建筑面积:">
                        <el-input
                            v-model="form.houseArea">
                        </el-input>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-form-item
                    label="家庭成员信息:">
                </el-form-item>
            </el-row>
            <el-row :gutter="80">
                <el-form-item>
                    <el-col :span="24">
                        <FamilyMemberSelector
                            @setFamilyList="setFamilyList">
                        </FamilyMemberSelector>
                        <el-table
                            :data="form.familyMemberList"
                            class="table"
                            max-height="400">
                            <el-table-column
                                prop="name"
                                label="名字"
                                width="200"/>
                            <el-table-column
                                prop="idCard"
                                label="身份证号码"
                                min-width="200"/>
                            <el-table-column
                                prop="relationShipDesc"
                                label="关系">
                                <template slot-scope="scope">
                                    <el-form-item
                                        label-width="0">
                                            <el-input
                                                v-model.trim="scope.row.relation"
                                                placeholder="请输入详情"/>
                                            </el-form-item>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="remove(scope.$index)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row :gutter="80">
                <el-form-item
                    label="农田附着物:">
                </el-form-item>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="水稻(亩):">
                        <el-input
                            v-model="form.riceArea">
                        </el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="蔬菜(亩):">
                        <el-input
                            v-model="form.vegeatableArea">
                        </el-input>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="苗木(亩):">
                        <el-input
                            v-model="form.miaoArea">
                        </el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="12">
                   <el-form-item
                        label="鱼塘(亩):">
                        <el-input
                            v-model="form.fishPondArea">
                        </el-input>
                    </el-form-item>
               </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col
                    :span="12">
                     <el-form-item
                        label="其他(亩):">
                        <el-input
                            v-model="form.otherArea">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
            <el-form-item
                    label="申请信息:">
            </el-form-item>
        </el-row>
        <el-row :gutter="80">
                <el-col
                    :span="8">
                     <el-form-item
                        label="填报时间:">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.applyDate" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
               <el-col :span="8">
                   <el-form-item
                        label="经报人:">
                        <el-input
                            v-model="form.handleUser">
                        </el-input>
                    </el-form-item>
               </el-col>
               <el-col :span="8">
                   <el-form-item
                        label="上传附件:">
                        <el-upload
                            class="upload-demo"
                            :multiple='false'
                            :auto-upload='true'
                            list-type='text'
                            :show-file-list='true'
                            :before-upload="beforeUpload"
                            action=''
                            :limit="1"
                            :on-exceed="handleExceed"
                            :http-request="uploadFile" >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
               </el-col>
            </el-row>
        </el-form>
         <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        type="primary"
                        size="custom"
                        @click="submit">提交申请</el-button>
          </el-col>
        </el-row>
    </d2-container>
</template>

<script>
import FamilyMemberSelector from '@/views/components/reg-population.vue'
import { submitExistApply } from '@api/exit.mange.js'
import { getTownNames } from '@api/enum.js'
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
        riceArea: '',
        vegeatableArea: '',
        miaoArea: '',
        fishPondArea: '',
        otherArea: '',
        applyDate: '',
        handleUser: '',
        familyMemberList: []
      },
      familyList: [],
      townList: [],
      villageList: []
    }
  },
  components: {
    FamilyMemberSelector
  },
  mounted () {
    this.townList = getTownNames()
    this.villageList = this.global.villageList
    console.log(this.villageList)
  },
  methods: {
    remove (index) {
      this.familyList.splice(index, 1)
      this.form.familyMemberList.splice(index, 1)
    },
    setFamilyList (familyMember) {
      this.familyList.push(familyMember)
      this.form.familyMemberList.push({
        id: familyMember.id,
        name: familyMember.name,
        idCard: familyMember.idCard,
        relation: ''
      })
    },
    submit () {
      submitExistApply(this.form).then(res => {
        this.$message.success('申请成功')
        this.$router.push({
          name: 'exit-mange-audit'
        }).catch(err => {
          console.log(err)
          this.$message.success('申请失败,请联系系统管理员')
        })
      })
    },
    beforeUpload (file) {
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return (isText | isTextComputer)
    },
    // 上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
    // 上传文件
    uploadFile (item) {
      const fileObj = item.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      console.log(item)
      form.append('excel', fileObj)
      form.append('templateId', item.data.templateId)
      form.append('year', item.data.year)
      form.append('townId', this.form.townId)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.$axios.post('/api/readExcel', form, config).then((res) => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: '上传失败'
        })
      })
    }
  }
}
</script>
