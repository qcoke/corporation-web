<template>
  <el-dialog
    width="60%"
    :title="title"
    :visible.sync="isShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="closeIt"
  >
    <el-form ref="submitForm" label-width="100px" :model="model" :rules="rules">
      <el-form-item label="姓名：" prop="name">
        <input v-model="model._id" type="hidden">
        <el-input v-model="model.name" type="text" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="英文名：" prop="englist_name">
        <el-input v-model="model.englist_name" type="text" placeholder="请输入英文名" />
      </el-form-item>
      <el-form-item label="出生日期：" prop="birthday">
        <el-date-picker v-model="model.birthday" type="date" placeholder="请选择出生日期" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="部门：" prop="org_id">
        <el-select v-model="model.org_id" placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in orgDic"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="介绍：" prop="description">
        <ckeditor v-model="model.description" :editor="editor" :config="editorConfig" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeIt">取 消</el-button>
      <el-button type="primary" @click.native="handlerSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { orgsList } from '../../../api/orgs'
import { staffeAddOrUpdate, staffeFind } from '../../../api/employee'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'AddOrUpdateEmployeeDialog',
  data() {
    return {
      title: '新增',
      loading: false,
      isShow: false,
      model: {},
      orgDic: [],
      rules: {
        name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        englist_name: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生年月', trigger: 'blur' }],
        org_id: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        info: [{ required: true, message: '请输入员工简历', trigger: 'blur' }]
      },
      editor: ClassicEditor,
      editorConfig: {
        height: '400px'
      }
    }
  },
  created() {
    this.setOrgDic()
  },
  methods: {
    handlerSubmit() {
      var _this = this
      this.$refs['submitForm'].validate(valid => {
        if (valid === true) {
          // 判断是更新还是删除
          staffeAddOrUpdate(_this.model).then(response => {
            _this.$message({
              message: '操作成功',
              type: 'success'
            })
            _this.$emit('reload')
            _this.closeIt()
          })
        } else {
          _this.$message.error('员工信息请输入完整之后再提交')
          return false
        }
      })
    },
    // 加载面板数据
    load(id) {
      const _this = this
      staffeFind(id).then(res => {
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
    },
    // 设置部门字典表
    setOrgDic() {
      const _this = this
      orgsList().then(res => {
        _this.orgDic = res.data
      })
    }
  }
}
</script>

