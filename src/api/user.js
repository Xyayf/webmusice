import { request } from '@/utill/request'
export const loginApi = (phone, password) => {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      phone,
      password
    }
  })
}
export const loginOutApi = () => {
  return request({
    url: '/logout',
    method: 'get'
  })
}
export const getPlaylists = (uid) => {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid
    }
  })
}
