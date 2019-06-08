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
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="村名">
                <el-select v-model="form.village" placeholder="请选择">
                            <el-option
                                v-for="item in villageList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年份">
                <el-select v-model="form.year" placeholder="请选择">
                            <el-option
                                v-for="item in yearList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="股份类型" prop="type">
                <el-select
                    v-model="form.stockType"
                    placeholder="股份类型"
                    style="width: 100px;">
                    <el-option label="城市型" value="0"/>
                    <el-option label="农村型" value="1"/>
                </el-select>
            </el-form-item>
             <el-form-item label="名称" prop="type">
                 <el-input v-model="form.shareholderName">
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
            股份分红计算
        </el-button>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable" style="margin-top:10px">
                <el-table-column type="index" label="序号" width="150">
                </el-table-column>
                <el-table-column prop="shareholderName" label="股东姓名" width="200">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号码" min-width="100">
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" min-width="100">
                </el-table-column>
                <el-table-column prop="familyNum" label="家庭成员个数" min-width="100">
                </el-table-column>
                <el-table-column prop="toalStock" label="股金总数（股）" width="100">
                </el-table-column>
                <el-table-column  label="股份类型" width="200">
                     <template slot-scope="scope">
                      {{ getStatus(scope.row.stockType) }}
                    </template>
                </el-table-column>
                <el-table-column prop="joinDate" label="入股时间" width="200">
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
import { getBusinessExcel, getShareHolderPage } from '@api/business.mange.js'
import { getStockType } from '@api/enum.js'

export default {
  data () {
    return {
      templateData: [],
      form: {
        town: '',
        stockType: '',
        village: '',
        shareholderName: '',
        year: ''
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
    this.yearList = this.global.yearList
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage - 1
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      getShareHolderPage({
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
      return getStockType(val + '')
    },
    exportExcel () {
      getBusinessExcel()
    }
  }
}
</script>
