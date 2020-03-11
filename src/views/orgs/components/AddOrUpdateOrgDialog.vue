<template>
  <el-dialog
    width="40%"
    :title="title"
    :visible.sync="isShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="closeIt"
  >
    <el-form ref="submitForm" label-width="100px" :model="model" :rules="rules">
      <el-form-item label="部门名称：" prop="title">
        <el-input type="text" v-model="model.title" placeholder="请输入部门名称" ></el-input>
      </el-form-item>
      <el-form-item label="描述名称：" prop="descr">
        <el-input type="textarea" :rows="6" resize="none" placeholder="请输入部门描述" v-model="model.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeIt">取 消</el-button>
      <el-button type="primary" @click.native="handlerSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { orgAddOrUpdate, orgFind } from '../../../api/orgs'

export default {
  name: 'AddOrUpdateOrgDialog',
  data() {
    return {
      title: '新增',
      loading: false,
      isShow: false,
      model: {},
      rules: {
        title: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        descr: [{ required: false, message: '请输入部门描述信息', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handlerSubmit() {
      var _this = this
      this.$refs['submitForm'].validate(valid => {
        if (valid === true) {
          orgAddOrUpdate(_this.model).then(response => {
            _this.$message({
              message: '操作成功',
              type: 'success'
            })
            _this.$emit('reload')
            _this.closeIt()
          })
        } else {
          _this.$message.error('部门信息请输入完整之后再提交')
          return false
        }
      })
    },
    // 加载面板数据
    load(id) {
      const _this = this
      orgFind(id).then(res => {
        const _model_ = { ...res }
        _this.model = _model_
      })
    },
    // 显示面板
    showIt(id) {
      this.isShow = true
      if (id) {
        this.load(id)
        this.title = '编辑'
      }
    },
    closeIt() {
      this.$refs['submitForm'].resetFields()
      this.model = {}
      this.isShow = false
    }
  }
}
</script>

