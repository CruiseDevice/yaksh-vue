import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Courses from '@/components/Courses'
import Quiz from '../components/Quiz.vue'
import CourseModule from '@/components/CourseModule'
import ViewModule from '@/components/ViewModule'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
      path: '/course/:course_id/view-module/:module_id',
      name: 'ViewModule',
      component: ViewModule
    }
  ]
})
