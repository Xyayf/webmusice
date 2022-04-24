import state from './state'
import * as getters from './getter'
import actions from './action'
import mutations from './mutation'
// console.log(state, getter, mutation)
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
