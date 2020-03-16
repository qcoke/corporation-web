<template>
  <el-dialog
    width="1000px"
    :title="title"
    :visible.sync="isShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="closeIt"
  >
    <el-form ref="submitForm" label-width="100px" :model="model" :rules="rules">
      <table border="0" width="100%">
        <tr>
          <td width="80%">
            <el-form-item label="姓名：" prop="name">
              <input v-model="model._id" type="hidden">
              <el-input v-model="model.name" type="text" placeholder="请输入姓名" />
            </el-form-item>
          </td>
          <td width="20%" rowspan="2" class="img-container">
            <el-upload
              class="avatar-uploader"
              action="/file/upload"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <br>
            照片(200x240)
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="英文名：" prop="englist_name">
              <el-input v-model="model.englist_name" type="text" placeholder="请输入英文名" />
            </el-form-item>
          </td>
        </tr>
      </table>
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
      <el-form-item label="资质：" prop="qualifications">
        <el-input
          v-model="model.qualifications"
          resize="none"
          type="textarea"
          placeholder="请输入获奖"
          :autosize="true"
        />
      </el-form-item>
      <el-form-item label="教育背景：" prop="education_background">
        <el-input
          v-model="model.education_background"
          resize="none"
          type="textarea"
          placeholder="请输入获奖"
          :autosize="true"
        />
      </el-form-item>
      <el-form-item label="工作经验：" prop="work_experiences">
        <el-input
          v-model="model.work_experiences"
          resize="none"
          type="textarea"
          placeholder="请输入获奖"
          :autosize="true"
        />
      </el-form-item>
      <el-form-item label="学术研究：" prop="academic_researches">
        <el-input
          v-model="model.academic_researches"
          resize="none"
          type="textarea"
          placeholder="请输入获奖"
          :autosize="true"
        />
      </el-form-item>
      <el-form-item label="获奖：" prop="awards">
        <el-input
          v-model="model.awards"
          resize="none"
          type="textarea"
          placeholder="请输入获奖"
          :autosize="true"
        />
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
      imageUrl: '//iph.href.lu/200x240',
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
        width: '860px',
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
    },
    // 设置用户的照片头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw) || '//iph.href.lu/200x240'
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
.img-container {
  text-align: center;
  vertical-align: top;
}
.avatar-uploader {
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 120px;
  line-height: 120px;
  border: 1px solid #eee;
  padding: 2px;
  font-size: 40px;
  background-color: #fff;
}
.avatar-uploader img{
  width: 100%;
  height: 100%;
}
</style>
