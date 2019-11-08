import axios from 'axios'

const TOKEN = '8ebb5a54048458a8bd73da259391a092c6627f1d'

const state = {
  courses: []
}

const mutations = {
  UPDATE_COURSES (state, payload) {
    state.courses = payload
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
  }
}

const getters = {
  courses: state => {
    return state.courses
  }
}

const coursesModule = {
  state,
  mutations,
  actions,
  getters
}

export default coursesModule
