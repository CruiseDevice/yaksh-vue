const state = {
  courses_: JSON.parse(localStorage.getItem('courses')) || [],
  module: []
}

const mutations = {
  UPDATE_MODULE (state, payload) {
    state.module = payload
  }
}

const actions = {
  fetchModule (state, payload) {
    const module_ = payload.courses[payload.courseId - 1]
    state.commit('UPDATE_MODULE', module_)
  }
}

const getters = {
  courses_: state => state.courses_,
  module_: state => state.module
}

export default {
  state,
  mutations,
  actions,
  getters
}
