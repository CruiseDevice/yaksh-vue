import axios from 'axios'

const TOKEN = '8ebb5a54048458a8bd73da259391a092c6627f1d'

const state = {
  courses: JSON.parse(localStorage.getItem('courses')) || [],
  module: []
}

const mutations = {
  UPDATE_COURSES (state, payload) {
    state.courses = payload
  },

  UPDATE_MODULE (state, payload) {
    state.module = payload
  }
}

const actions = {
  fetchCourses ({commit}) {
    axios({
      method: 'get',
      url: `http://localhost:8000/api/get_courses`,
      headers: {
        Authorization: 'Token ' + TOKEN,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const courses = response.data
        commit('UPDATE_COURSES', courses)
        localStorage.setItem('courses', JSON.stringify(courses))
      })
  },

  fetchModule (state, payload) {
    const module = payload.courses[payload.courseId - 1]
    state.commit('UPDATE_MODULE', module)
  }
}

const getters = {
  courses: state => state.courses,
  module: state => state.module
}

const coursesModule = {
  state,
  mutations,
  actions,
  getters
}

export default coursesModule
