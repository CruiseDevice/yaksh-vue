<template>
  <div>
    <center><h2>Enrolled Courses</h2></center>
    <div v-for="(course, index) in courses" :key="course.id">
      <div class="card">
        <div class="card-body text-center">
          <a href="#">
              <h4 class="card-title"><b>{{course.name}} by {{course.creator}}</b></h4>
          </a>
          <p class="card-text"><span class="course-time">{{course.start_enroll_time | date}}</span>  to  <span class="course-time">{{course.end_enroll_time | date}}</span></p>
          <b-button v-b-toggle="'collapse-'+index" class="m-1">DETAILS</b-button>
          <router-link :to="`/course/${course.id}`" class="btn btn-success">Continue</router-link>
        </div>
        <b-collapse :id="'collapse-'+index">
          <div class="card-header">
            {{course.name}} by {{course.creator}}
          </div>
          <div class="card-body">
            <div class="card-text">
              <strong><u>What you'll learn Instructor</u>:</strong>
            </div>
            <div>
              <div v-for="(learning_module, index) in getLearningModule(course)" :key="index">
                <li class="li_learning_module">{{learning_module}}</li>
              </div><br>
              <div>
                <strong><u>Course Instructor</u>:</strong><br>
                <p class="instructor">{{course.creator}}</p>
              </div>
              <div>
                <strong><u>Course Instructions</u>:</strong><br>
                <div v-html="course.instructions"></div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Courses',
  created () {
    this.$store.dispatch('fetchCourses')
  },
  computed: {
    ...mapGetters([
      'courses',
      'learning_module'
    ])
  },
  methods: {
    getLearningModule: course => {
      if (course.learning_module.length === 0) {
        return ['No Module Found']
      } else {
        return course.learning_module.map(function (module) {
          return module.name
        })
      }
    }
  }
}
</script>

<style>
.card {
  width: 48rem;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
  margin-top: 1em;
}

.li_learning_module, .instructor {
  padding-left: 1.5em;
}

.course-time {
  color: black;
  padding: 1em;
}
</style>
