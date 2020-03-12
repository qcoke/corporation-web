import request from '@/utils/request'

// 获取“关于我们”的数据
export function getAboutPage() {
  return request({
    url: '/pages/about/',
    method: 'get'
  })
}

export function savePage(data) {
  return request({
    url: '/pages/' + data._id,
    method: 'put',
    data
  })
}
