<template>
    <div>
        <div class="question_numbers" v-for="question in questions.questions" :key="question.id">
            <button @click="showQuestion(question)" class="btn btn-outline-success">{{question.id}}</button>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import {mapActions} from 'vuex';

export default {
    name: 'QuestionNumbers',
    props: ['questions'],
    methods: {
        ...mapActions([
                'showQuestion'
            ])
    }
}
</script>

<style scoped>
.question_numbers {
    box-sizing: border-box;
    display: inline-block;
    padding:1px 2px 4px 3px;
}

.btn-outline-success {
    color: white;
    background-color: transparent;
    border-color: white;
    padding:1em 1em 1em 1em;
}

.btn-outline-success:hover {
    background-color: #66655c
}
</style>