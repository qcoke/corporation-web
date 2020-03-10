import request from '@/utils/request'

// 获取列表
export function orgsList() {
  return request({
    url: '/orgs/',
    method: 'get'
  })
}

export function orgAdd(data) {
  return request({
    url: '/orgs/',
    method: 'post',
    data
  })
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

export function orgUpdate(orgId, data) {
  return request({
    url: `/orgs/${orgId}`,
    method: 'post'
  })
}
