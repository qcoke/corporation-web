import Vue from 'vue'
import format from 'date-format'

export default {
  initFilter: function() {
    // 格式化时间
    Vue.filter('dateformat', function(dateStr) {
      if (dateStr) {
        return format('yyyy-MM-dd', new Date(dateStr))
      }
    })
  }
}
