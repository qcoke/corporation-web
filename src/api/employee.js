import request from '@/utils/request'

// 获取列表
export function staffesList() {
  return request({
    url: '/staffes/',
    method: 'get'
  })
}

export function staffeAddOrUpdate(data) {
  console.log('传输给服务器的数据:', data)
  if (data._id === undefined) {
    // 新增
    return request({
      url: '/staffes/',
      method: 'post',
      data
    })
  } else {
    // 编辑
    return request({
      url: '/staffes/' + data._id,
      method: 'put',
      data
    })
  }
}

export function staffeDelete(staffId) {
  return request({
    url: `/staffes/${staffId}`,
    method: 'delete'
  })
}

export function staffeFind(staffId) {
  return request({
    url: `/staffes/${staffId}`,
    method: 'get'
  })
}
