import axios from 'axios'

const TOKEN = '8ebb5a54048458a8bd73da259391a092c6627f1d'

const state = {
  courses: JSON.parse(localStorage.getItem('courses')) || [],
  course: null,
  modules: JSON.parse(localStorage.getItem('modules')) || []
}

const mutations = {
  UPDATE_COURSES (state, payload) {
    state.courses = payload
  },

  UPDATE_COURSE (state, payload) {
    state.course = payload
  },

  UPDATE_MODULES (state, payload) {
    state.modules = payload
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

  fetchCourse (state, payload) {
    const course = payload.courses[payload.courseId - 1]
    state.commit('UPDATE_COURSE', course)
  },

  getModules (state) {
    const course = state.getters.course
    const modules = course.learning_module
    state.commit('UPDATE_MODULES', modules)
    localStorage.setItem('modules', JSON.stringify(modules))
  }
}

const getters = {
  courses: state => state.courses,
  course: state => state.course,
  modules: state => state.modules,
  modulesExists: state => state.modules.length !== 0,
  unitExists: state => {
    const exists = state.modules.map(function (module_) {
      return module_.learning_unit.length !== 0
    })
    return exists
  }
}

const coursesModule = {
  state,
  mutations,
  actions,
  getters
}

export default coursesModule
