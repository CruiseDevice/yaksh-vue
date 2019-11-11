<template>
  <div>
    {{module}}
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CourseModules',
  created () {
    console.log(this.$route.params.id)
    const courses = this.courses
    const courseId = this.$route.params.id
    this.$store.dispatch('fetchModule', {courses, courseId})
  },
  computed: {
    ...mapGetters([
      'courses',
      'module'
    ])
  }
}
</script>
