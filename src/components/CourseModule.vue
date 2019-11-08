<template>
  <div>
    {{module_}}
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CourseModules',
  created () {
    console.log(this.$route.params.id)
    const courses = this.courses_
    const courseId = this.$route.params.id
    this.$store.dispatch('fetchModule', {courses, courseId})
  },
  computed: {
    ...mapGetters([
      'courses_',
      'module_'
    ])
  }
}
</script>
