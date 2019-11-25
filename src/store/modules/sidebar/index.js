/* eslint-disable */
import axios from 'axios';

// import {TOKEN} from './../../../../config/dev.env.js'

const validate_url = "http://localhost:8000/api/validate/"
const TOKEN = "8ebb5a54048458a8bd73da259391a092c6627f1d" //"d88812ee582e2ab6bb0cdd93faa600541a2bcb39"

// const course_id = 1
// const quiz_id = 1

const state = {
    questions: [],
    response: [],
}

const mutations = {
    UPDATE_SELECTED_QUESTION(state, payload){
        state.questions = payload.data;
        state.response = payload;
    }
};

const actions = {
    fetchQuizQuestion({ commit }, payload) {
        const course_id = payload.course_id
        const quiz_id = payload.quiz_id
        axios({
            method: 'get',
            url: `http://localhost:8000/api/start_quiz/${course_id}/${quiz_id}`,
            headers: {
                Authorization: 'Token ' + TOKEN,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response)
            commit('UPDATE_SELECTED_QUESTION', response)
        });
    },
};

const getters = {
    getquestions: state => state.questions,
    questionsExists: state => state.questions.length !== 0 
};

const sidebarModule = {
    state,
    mutations,
    actions,
    getters
}

export default sidebarModule;