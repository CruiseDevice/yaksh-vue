<template>
  <div>
    <nav id="sidebar">
      <div class="sidebar-header">
          <h3>Course Name</h3>
      </div>
      <div v-if="getquestions">
        <QuestionNumbers
        :questions="getquestions"
        />
      </div>
    </nav>
  </div>
</template>
<script>
/* eslint-disable */
import {mapGetters} from 'vuex';
import QuestionNumbers from './QuestionNumbers'
import axios from 'axios'

export default {
  name: 'Sidebar',
  components: {
    QuestionNumbers
  },
  computed: {
    ...mapGetters([
        'getquestions',
        'questionsExists',
        'firstQuestion',
        'question'
      ])
  },
  created () {
    const course_id = this.$route.params.course_id
    const quiz_id = this.$route.params.quiz_id
    const payload = {course_id, quiz_id}
    this.$store.dispatch('fetchQuizQuestion', payload)
  },
  updated () {
    console.log(this.question)
    if (this.question === undefined) {
      this.$store.dispatch('showQuestion', this.firstQuestion[0])
    } else {
      this.$store.dispatch('showQuestion', this.question)
    }
  }

}
</script>
<style scoped>

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a, a:hover, a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  height: 100%;
  background: #7386D5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
      margin-left: 0;
  }
}
</style>
