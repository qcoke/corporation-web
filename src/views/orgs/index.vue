<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
