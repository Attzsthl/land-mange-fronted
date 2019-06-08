<template>
     <d2-container>
        <template slot="header">修改数据</template>
        <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">

            <el-form-item
                v-if="status == 1"
                style="float:right">
                <el-button
                    type="primary"
                    @click="handleSave">
                    新增
                </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号码" min-width="100">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100">
                </el-table-column>
                <el-table-column label="出生年月" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.bornDate | FormatDate('yyyy-MM-dd') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cadastralNum" label="地籍编号" min-width="100">
                </el-table-column>
                <el-table-column prop="town" label="所在镇" width="100">
                </el-table-column>
                <el-table-column prop="village" label="所在村" width="100">
                </el-table-column>
                <el-table-column prop="socialSecurityType" label="社保类型" width="100">
                   <template slot-scope="scope">
                        <span> {{ getSocialSecurityType(scope.row.socialSecurityType) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center" v-if="status == 1">
                    <template slot-scope="scope" >
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <div class="pagination">
                <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                </el-pagination>
        </div>

        <el-row>
          <el-col :span="24" style="text-align: center; margin-top: 15px;">
               <el-button
                        v-hasAuthorization
                        v-if="isAudit"
                        type="primary"
                        size="custom"
                        @click="sendSuccess">审核通过</el-button>
          </el-col>
        </el-row>

         <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" >
            <el-form ref="form" :model="form" label-width="150px">
              <el-row :gutter="50">
                <el-col :span="24">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="性别">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="省份证号码">
                    <el-input v-model="form.idCard"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="出生年月">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.bornDate" value-format="yyyy-MM-dd"  style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="地籍编号">
                    <el-input v-model="form.cadastralNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="所在镇">
                    <el-input v-model="form.town"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="所在村">
                    <el-input v-model="form.village"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="社保类型">
                    <el-select v-model="form.socialSecurityType" placeholder="请选择">
                        <el-option
                          v-for="item in socialSecurityOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
     </d2-container>
</template>

<script>
import { getRegPopulationPage, saveRegPopulation, deleteRegPopulation, auditTemplate } from '@api/data.template.js'

export default {
  data () {
    return {
      templateName: '',
      templateData: [],
      form: {
        id: '',
        name: '',
        idCard: '',
        sex: '',
        bornDate: '',
        cadastralNum: '',
        town: '',
        village: '',
        socialSecurityType: '',
        year: '',
        townId: ''
      },
      loading: true,
      pagination: {
        page: 0,
        size: 10,
        total: 0
      },
      editVisible: false,
      delVisible: false,
      searchForm: {
        townId: '' // 查询当前用户所属镇的数据
      },
      idx: '-1',
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      socialSecurityOptions: [{
        value: '0',
        label: '城市型'
      }, {
        value: '1',
        label: '农村型'
      }],
      isAudit: false,
      status: -1
    }
  },
  mounted () {
    this.isAudit = this.$route.query.isAudit
    this.status = this.$route.query.status
    this.form.year = this.$route.query.year
    this.form.townId = this.$route.query.townId
    this.searchForm.townId = this.$route.query.townId
    this.fetchData()
  },
  methods: {
    getSocialSecurityType (value) {
      let socialSecurityLabel = this.socialSecurityOptions
      value += ''
      for (let i = 0; i < socialSecurityLabel.length; i++) {
        if (socialSecurityLabel[i].value === value) {
          return socialSecurityLabel[i].label
        }
      }
    },
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    // 获取 easy-mock 的模拟数据
    fetchData () {
      this.loading = true
      this.searchForm.year = this.$route.query.year
      getRegPopulationPage({
        ...this.pagination,
        ...this.searchForm
      }).then(res => {
        this.templateData = res.content
        this.pagination.total = res.page.total
        this.loading = false
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    },
    search () {
      this.is_search = true
      this.fetchData()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleSave () {
      let initForm = {
        id: '',
        name: '',
        idCard: '',
        sex: '',
        bornDate: '',
        cadastralNum: '',
        town: '',
        village: '',
        socialSecurityType: '',
        year: this.$route.query.year,
        townId: this.$route.query.townId
      }
      this.form = initForm
      this.editVisible = true
    },
    handleEdit (index, row) {
      this.idx = index
      const item = this.templateData[index]
      this.form = item
      this.editVisible = true
    },
    handleDelete (index, row) {
      this.idx = row.id
      this.delVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit () {
      saveRegPopulation(this.form).then(res => {
        this.$message.success(res)
        this.fetchData()
      })
      this.editVisible = false
      // this.$set(this.tableData, this.idx, this.form)
    },
    // 确定删除
    deleteRow () {
      let params = {
        id: this.idx
      }
      deleteRegPopulation(params).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      })
      this.delVisible = false
    },
    sendSuccess () {
      let params = {
        templateId: this.$route.query.templateId,
        year: this.$route.query.year,
        townId: this.$route.query.townId,
        status: 4
      }
      this.loading = true
      auditTemplate(params).then(res => {
        this.$message.success('审核通过')
        this.loading = false
        this.$router.push({
          name: 'data-module-template-audit'
        })
      }).catch(err => {
        console.log('err', err)
        this.loading = false
      })
    }
  }
}
</script>
