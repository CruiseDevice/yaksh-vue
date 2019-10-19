<template>
    <div>
        <div v-for="(course, index) in courses" :key="index">
            <div class="card">
                <div class="card-body text-center">
                    <a href="#">
                        <h4 class="card-title"><b>{{course.name}} by {{course.creator}}</b></h4>
                    </a>
                    <p class="card-text">{{moment(course.start_enroll_time)}} to {{moment(course.end_enroll_time)}}</p>
                    <b-button v-b-toggle="'collapse-'+index" class="m-1">DETAILS</b-button>
                    <a href="#" class="btn btn-primary">Download Course</a>
                    <a href="#" class="btn btn-success">Continue</a>
                </div>
                <b-collapse :id="'collapse-'+index">
                    <div class="card-header">
                        {{course.name}} by {{course.creator}}
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <tr>
                                <th>What you'll learn</th>
                                <th>STARTS ON:</th>
                                <th>Instructor</th>
                                <th>ENDS ON</th>
                            </tr>
                            <tr>
                                <td v-html="learning_module"></td>
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
    }
}
</script>

<style>
.card {
    width: 48rem;
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
    margin-top: 10em;
}

</style>