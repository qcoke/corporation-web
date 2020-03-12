<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="small" @click="showAddOrUpdate()"><i class="el-icon-plus"/> 新 增</el-button>
      </el-col>
    </el-row>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="姓名" prop="name" width="400" />
      <el-table-column label="英文名" prop="englist_name" />
      <el-table-column label="部门" prop="org_id" :formatter="changeForText" />
      <el-table-column align="center" prop="createdAt" label="创建时间" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt|dateformat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="showAddOrUpdate(scope.row._id)"><i class="el-icon-edit-outline" /> 编 辑
          </el-button>
          <el-button type="danger" plain size="mini" @click="deleteData(scope.row._id)"><i class="el-icon-close" /> 删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddOrUpdateEmployeeDialog ref="AddOrUpdateEmployeeDialog" @reload="load" />
  </div>
</template>

<script>
import AddOrUpdateEmployeeDialog from './components/AddOrUpdateEmployeeDialog.vue'
import { staffesList, staffeDelete } from '../../api/employee'
import { orgsList } from '../../api/orgs'

export default {
  name: 'Employee',
  components: {
    AddOrUpdateEmployeeDialog
  },
  data() {
    return {
      orgDic: [],
      list: null,
      page: 0,
      total: 0,
      listLoading: true
    }
  },
  created() {
    const _this = this
    orgsList().then(res => {
      _this.orgDic = res.data
    })
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      this.listLoading = true
      staffesList().then(response => {
        this.listLoading = false
        this.list = response.data
        this.page = response.page
        this.total = response.total
      })
    },
    // 弹出面板
    showAddOrUpdate(id) {
      this.$refs['AddOrUpdateEmployeeDialog'].showIt(id)
    },
    // 删除数据
    deleteData(id) {
      const _this = this
      this.$confirm('是否删除该数据', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        staffeDelete(id).then(res => {
          _this.$message({ message: '删除成功', type: 'success' })
          _this.load()
        })
      })
    },
    // 把部门ID替换成为文字
    changeForText(row, column) {
      let result = ''
      for (var i = 0, icount = this.orgDic.length; i < icount; i++) {
        if (this.orgDic[i]._id === row.org_id) {
          result = this.orgDic[i].title
        }
      }
      return result
    }
  }
}
</script>
