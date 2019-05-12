<template>
     <d2-container>
         <el-form
            :inline="true"
            :model="form"
            ref="form"
            style="margin-bottom: -18px">
            <el-form-item
                >
                选择镇:
                <el-select
                    v-model="form.townId"
                    placeholder="请选择">
                        <el-option
                            v-for="item in townNames"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item
                label="选择村:">
                <el-input
                    v-model="form.village"
                    placeholder="请选择村">
                </el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select
                    v-model="form.year"
                    placeholder="年份选择"
                    style="width: 100px;">
                    <el-option label="2019" value="2019"/>
                    <el-option label="2018" value="2018"/>
                    <el-option label="2017" value="2017"/>
                    <el-option label="2016" value="2016"/>
                    <el-option label="2015" value="2015"/>
                </el-select>
            </el-form-item>
            <el-form-item
                style="float:right">
                <el-button
                    type="primary"
                    @click="search">
                    查询
                </el-button>
            </el-form-item>
        </el-form>
        <el-table :data="templateData" v-loading="loading" class="table" ref="templateTable">
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="town" label="镇名" width="200">
                </el-table-column>
                <el-table-column prop="village" label="村名" width="200">
                </el-table-column>
                <el-table-column prop="year" label="年份" width="100">
                </el-table-column>
                <el-table-column prop="yearendCulArea" label="耕地总面积" width="100">
                </el-table-column>
                <el-table-column prop="hsfArea" label="高标准农田面积" width="100">
                </el-table-column>
                <el-table-column prop="faArea" label="设施农业面积" width="100">
                </el-table-column>
                <el-table-column prop="gsArea" label="粮食播种面积" width="100">
                </el-table-column>
                <el-table-column prop="vpArea" label="蔬菜播种面积" width="100">
                </el-table-column>
                <el-table-column prop="constructionLandArea" label="村集体经营性建设用地面积" width="100">
                </el-table-column>
                <el-table-column prop="homesteadArea" label="全村宅基地面积" width="100">
                </el-table-column>
                <el-table-column label="操作" width="200" align="center" v-if="status == '1'">
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
     </d2-container>
</template>

<script>
import { getLandUseTypePage } from '@api/land.mange.js'

export default {
  data () {
    return {
      templateName: '',
      templateData: [],
      form: {
        townName: '',
        viilage: '',
        townId: '',
        year: ''
      },
      loading: true,
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      townNames: [
        { 'id': '1', 'name': '横塘街道' },
        { 'id': '2', 'name': '虎丘区镇湖街道' },
        { 'id': '3', 'name': '浒墅关镇' },
        { 'id': '4', 'name': '通安镇' },
        { 'id': '5', 'name': '东渚镇' }
      ],
      status: '-1'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    // 分页导航
    paginationCurrentChange (currentPage) {
      this.pagination.page = currentPage
      this.fetchData()
    },
    // 获取 easy-mock 的模拟数据
    fetchData () {
      this.loading = true
      getLandUseTypePage({
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
    }
  }
}
</script>
