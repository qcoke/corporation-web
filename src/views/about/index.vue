<template>
  <div class="page-view">
    <input v-model="id" type="hidden">
    <ckeditor v-model="html" :editor="editor" :config="editorConfig" />
    <p>
      <el-button type="primary" size="small" @click="submit">保 存</el-button>
    </p>
  </div>
</template>

<script>
import { savePage, getAboutPage } from '../../../src/api/page'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'About',
  data() {
    return {
      editor: ClassicEditor,
      id: '',
      html: '',
      editorConfig: {
        width: '1150px',
        ckfinder: {
          uploadUrl: 'http://localhost:3000/file/upload'
        }
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    // 加载数据
    loadData() {
      const _this = this
      getAboutPage().then(res => {
        const data = res.data
        _this.id = data._id
        _this.html = data.description
      })
    },
    // 保存数据
    submit() {
      const params = {
        _id: this.id,
        type: 'about',
        description: this.html
      }
      const _this = this
      savePage(params).then(() => {
        _this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style scoped>
.page-view {
  width: 1140px;
  margin: 20px;
  min-height: 400px;
  font-size: 15px;
  line-height: 28px;
  font-family: 'Open Sans', sans-serif;
}
</style>
