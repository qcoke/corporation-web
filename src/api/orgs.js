import request from '@/utils/request'

// 获取列表
export function orgsList() {
  return request({
    url: '/orgs/',
    method: 'get'
  })
}

export function orgAddOrUpdate(data) {
  if (data._id === undefined) {
    return request({
      url: '/orgs/',
      method: 'post',
      data
    })
  } else {
    return request({
      url: `/orgs/${data._id}`,
      method: 'put',
      data
    })
  }
}

export function orgDelete(orgId) {
  return request({
    url: `/orgs/${orgId}`,
    method: 'delete'
  })
}

export function orgFind(orgId) {
  return request({
    url: `/orgs/${orgId}`,
    method: 'get'
  })
}

