<template>
  <div class="container">
    <div class="jumbotron">
      <center><h2>{{course.name}}</h2></center>
    </div>
    <div v-if="modulesExists">
      <div v-for="(module_, index) in modules" :key="module_.id">
        <div class="card">
          <div class="card-body text-center">
            <h5>{{module_.name}}</h5>
            <b-button v-b-toggle="'collapse-'+index" class="m-1">DETAILS</b-button>
            <router-link :to="`/course/${course.id}/view-module/${module_.id}`" class="btn btn-success">START</router-link>
          </div>
          <b-collapse :id="'collapse-'+index">
            <div class="card-body">
                <div class="card-text">
                  <div v-if="unitExists">
                    <!-- {{module_.learning_unit}} -->
                    <div v-for="unit in module_.learning_unit" :key="unit.id">
                      <div v-if="quizExists(unit.quiz)">
                        <center>{{unit.quiz.description}}</center>
                      </div>
                      <div v-if="lessonExists(unit.lesson)">
                        <center>{{unit.lesson.name}}</center>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <!-- unitdoesnotexists -->
                  </div>
                </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
    <div v-else class="text-center h4">
      <span class="no-modules">No Modules found</span>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CourseModules',
  created () {
    const courses = this.courses
    const courseId = this.$route.params.course_id
    this.$store.dispatch('fetchCourse', {courses, courseId})
    this.$store.dispatch('getModules')
  },
  computed: {
    ...mapGetters([
      'courses',
      'course',
      'modules',
      'modulesExists',
      'unitExists'
    ])
  },
  methods: {
    quizExists (quiz) {
      return quiz !== null
    },
    lessonExists (lesson) {
      return lesson !== null
    }
  }
}
</script>

<style>
.jumbotron {
  padding: 1em;
}

.card {
  width: 45rem;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
  margin-top: 1em;
}

.no-modules {
  background-color: #ff7a62;
  padding: 0.3em;
}
</style>
