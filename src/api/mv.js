import { request } from '../utill'
export const getAllMvs = (params) => request.get('/mv/all', { params })
