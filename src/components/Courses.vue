<template>
    <div>
        <center><h2>Enrolled Courses</h2></center>
        <div v-for="(course, index) in courses" :key="course.id">
            <div class="card">
                <div class="card-body text-center">
                    <a href="#">
                        <h4 class="card-title"><b>{{course.name}} by {{course.creator}}</b></h4>
                    </a>
                    <p class="card-text">{{moment(course.start_enroll_time)}} to {{moment(course.end_enroll_time)}}</p>
                    <b-button v-b-toggle="'collapse-'+index" class="m-1">DETAILS</b-button>
                    <router-link :to="'CourseModules'" class="btn btn-success">Continue</router-link>
                </div>
                <b-collapse :id="'collapse-'+index">
                    <div class="card-header">
                        {{course.name}} by {{course.creator}}
                    </div>
                    <div class="card-body text-center">
                        <table class="table">
                            <tr>
                                <th>What you'll learn</th>
                                <th>STARTS ON:</th>
                                <th>Instructor</th>
                                <th>ENDS ON</th>
                            </tr>
                            <tr>
                                <td v-html="get_learning_module(course)"></td>
                                <td>{{moment(course.start_enroll_time)}}</td>
                                <td>{{course.creator}}</td>
                                <td>{{moment(course.end_enroll_time)}}</td>
                            </tr>
                        </table>
                    </div>
                </b-collapse>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Courses',
    created () {
        this.$store.dispatch('fetchCourses')
    },
    computed: {
        ...mapGetters([
                'courses',
                'learning_module'
            ]),
    },
    methods: {
        get_learning_module: course => {
            if (course.learning_module["0"] === undefined) {
                return "No Module Found"
            } else {
                return course.learning_module["0"].description
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

</style>