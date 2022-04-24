import { getItem, setItem } from '../../utill/localstorage'
const THEME = 'theme'
export default {
  namespaced: true,
  state: {
    theme: getItem(THEME) || 'white'
  },
  mutations: {
    setTheme (state, value) {
      setItem(THEME, value)
      state.theme = value
      console.log(value)
    }
  },
  actions: {
  }

}
