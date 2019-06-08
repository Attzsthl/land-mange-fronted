<template>
    <div class="user-selector">
        <!-- <el-input
            :readonly="true"
            :placeholder="placeholder"
            v-model="dispalyValue"
            class="input-with-select"> -->
            <el-button
                slot="append"
                type="primary"
                icon="search"
                @click="showDialog">
                添加家庭成员
            </el-button>
        <el-dialog
            :visible.sync="dialogVisible"
            title="选择家庭成员"
            class="ibrain-dialog user-selector-dialog" >
            <el-row
                class="user-selector__header">
                <el-col :span="10">
                    <el-input
                        :validate-event="false"
                        v-model="name"
                        class="no-validate"
                        placeholder="输入姓名搜索" />
                </el-col>
                <el-col :span="10">
                    <el-input
                        :validate-event="false"
                        v-model="idCard"
                        class="no-validate"
                        placeholder="输入身份证搜索" />
                </el-col>
                <el-col :span="4">
                    <el-button
                        type="primary"
                        @click="getData">搜索</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="listLoading"
                :stripe="true"
                :data="list"
                :fit="true"
                border
                max-height="400">
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="200"/>
                <el-table-column
                    prop="idCard"
                    label="身份证号码"/>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="selectUser(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div
                class="user-selector__pager">
                <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    layout="total, prev, pager, next, jumper"
                    @current-change="pageChanged"/>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getRegPopulationPage } from '@api/data.template.js'
export default {
  name: 'UserSelector',
  props: {
    queryMethod: {
      type: Function
    }
  },
  data () {
    return {
      dialogVisible: false,
      total: 0,
      pageSize: 10,
      name: '',
      idCard: '',
      currentPage: 1,
      dispalyValue: this.outDisplayValue,
      list: [],
      listLoading: false
    }
  },
  computed: {
    innerValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        if (!this.list.length) {
          this.getData()
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    },
    getData () {
      this.listLoading = true
      let { currentPage, pageSize, name, idCard } = this
      let param = { page: currentPage - 1, size: pageSize, name, idCard }
      getRegPopulationPage(param).then(data => {
        this.listLoading = false
        this.list = data.content
        this.total = data.totalElements
      }, () => {
        this.listLoading = false
      })
    },
    selectUser (user) {
      this.$emit('setFamilyList', user)
      this.dialogVisible = false
    },
    pageChanged (page) {
      this.currentPage = page
      this.getData()
    }
  }

}
</script>

<style lang="scss">
.user-selector {
   .ibrain-dialog &__header {
        .el-button {
            width: 100%;
        }
        .el-input {
            width: 95%;
        }
        margin-bottom: 10px;
    }
    .el-input-group__append button.el-button--primary {
        color: #fff;
        background-color: #23b7e5;
        border-color: #23b7e5;
        border-top: 1px;
        border-bottom: 1px;
    }
    &__pager {
        margin-top: 10px;
        text-align: center;
    }
    .el-dialog .el-dialog__body {
        margin-bottom: 20px;
    }
}

</style>
