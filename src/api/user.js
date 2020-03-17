import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/user',
    method: 'post',
    params: { }
  })
}

export function logout() {
  return request({
    url: '/auth/loginOut',
    method: 'post'
  })
}
