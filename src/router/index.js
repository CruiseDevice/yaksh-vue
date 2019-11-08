import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Courses from '@/components/Courses'
import Quiz from '../components/Quiz.vue'
import CourseModule from '@/components/CourseModule'

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
      path: '/quiz/start',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/courses/course-module/:id',
      name: 'CourseModule',
      component: CourseModule
    }
  ]
})
