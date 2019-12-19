import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/Courses'
import Quiz from '../components/Quiz.vue'
import CourseModule from '@/components/CourseModule'
import ViewModule from '@/components/ViewModule'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/quiz/start/:course_id/:quiz_id',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/course/:course_id',
      name: 'CourseModule',
      component: CourseModule
    },
    {
      path: '/course/:course_id/:module_id',
      name: 'ViewModule',
      component: ViewModule
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
