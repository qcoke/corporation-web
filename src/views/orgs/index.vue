<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="small" @click="showAddOrUpdate"><i class="el-icon-plus" /> 新 增</el-button>
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
      <el-table-column label="部门名称" prop="title" width="400" />
      <el-table-column prop="description" label="部门说明" />
      <el-table-column align="center" prop="createdAt" label="创建时间" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | dateformat }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <!--<el-button type="primary" plain size="mini"><i class="el-icon-warning-outline"></i> 查 看</el-button>-->
          <el-button type="primary" plain size="mini" @click="showAddOrUpdate(scope.row._id)"><i class="el-icon-edit-outline" /> 编 辑</el-button>
          <el-button type="danger" plain size="mini" @click="deleteData(scope.row._id)"><i class="el-icon-close" /> 删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddOrUpdateOrgDialog ref="AddOrUpdateOrgDialog" @reload="load" />
  </div>
</template>
<script>
import AddOrUpdateOrgDialog from './components/AddOrUpdateOrgDialog.vue'
import { orgsList, orgDelete } from '@/api/orgs'

export default {
  name: 'Org',
  components: {
    AddOrUpdateOrgDialog: AddOrUpdateOrgDialog
  },
  data() {
    return {
      list: null,
      page: 0,
      total: 0,
      listLoading: true
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      // const _this = this;
      this.listLoading = true
      orgsList().then(response => {
        this.listLoading = false
        this.list = response.data
        this.page = response.page
        this.total = response.total
      })
    },
    // 弹出面板
    showAddOrUpdate(id) {
      this.$refs['AddOrUpdateOrgDialog'].showIt(id)
    },
    // 删除数据
    deleteData(id) {
      const _this = this
      this.$confirm('是否删除该分组', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        orgDelete(id).then(res => {
          _this.$message({ message: '删除成功', type: 'success' })
          _this.load()
        })
      })
    }
  }
}
</script>
