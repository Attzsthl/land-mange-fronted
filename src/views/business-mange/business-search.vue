<template>
     <d2-container>
         <template slot="header">
             <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item label="镇名">
                <el-select v-model="form.town" placeholder="请选择">
                    <el-option
                            v-for="item in townList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="村名">
                 <el-input v-model="form.village">
                 </el-input>
            </el-form-item>
            <el-form-item label="经营者类型" prop="type">
                <el-select
                    v-model="form.operatorType"
                    placeholder="状态选择"
                    style="width: 100px;">
                    <el-option label="个体经营" value="0"/>
                    <el-option label="村集体经营" value="1"/>
                    <el-option label="租凭经营" value="2"/>
                </el-select>
            </el-form-item>
             <el-form-item label="名称" prop="type">
                 <el-input v-model="form.operatorName">
                 </el-input>
             </el-form-item>
            <el-button
                  type="primary"
                  style="float:right"
                  @click="search">
                  查询
                </el-button>
        </el-form>
        </template>
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
                <el-table-column prop="contractedArea" label="地块面积（亩）" min-width="100">
                </el-table-column>
                <el-table-column prop="operatorName" label="经营者名称" min-width="100">
                </el-table-column>
                <el-table-column prop="idCard" label="组织机构代码" min-width="100">
                </el-table-column>
                <el-table-column  label="经营者类型" width="100">
                  <template slot-scope="scope">
                      {{ getStatus(scope.row.operatorType ) }}
                  </template>
                </el-table-column>
                <el-table-column prop="town" label="所在镇" width="200">
                </el-table-column>
                <el-table-column prop="village" label="所在村" min-width="100">
                </el-table-column>
        </el-table>
        <div class="pagination">
                <el-pagination background @current-change="paginationCurrentChange" layout="prev, pager, next" :total="pagination.total">
                </el-pagination>
        </div>
     </d2-container>
</template>

<script>
import { getBusinessExcel, getBusinessPage } from '@api/business.mange.js'
import { getOperatorType } from '@api/enum.js'

export default {
  data () {
    return {
      year: '',
      templateData: [],
      form: {
        town: '',
        status: '',
        village: '',
        operatorName: '',
        operatorType: ''
      },
      townList: [],
      villageList: [],
      loading: true,
      pagination: {
        page: 0,
        size: 20,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
    this.townList = this.global.townList
    this.villageList = this.global.villageList
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage - 1
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getBusinessPage({
        ...this.pagination,
        ...this.form
      }).then(res => {
        this.templateData = res.content
        this.pagination.total = res.totalElements
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
    getStatus (val) {
      return getOperatorType(val)
    },
    exportExcel () {
      getBusinessExcel()
    }
  }
}
</script>
