import { service } from '../utill'
export const getSearchHot = () => service.get('/search/hot')
export const getSearchSuggest = (keywords) => service.get('/search/suggest', { params: { keywords } })
