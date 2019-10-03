/* eslint-disable */
import axios from 'axios';

import {TOKEN} from './../../../../config/dev.env.js'

const course_id = 1
const quiz_id = 1

const state = {
    questions: [],
    response: []
}

const mutations = {
    UPDATE_SELECTED_QUESTION(state, payload){
        state.questions = payload.data;
        state.response = payload;
    }
};

const actions = {
    fetchQuizQuestion({ commit }) {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/start_quiz/${course_id}/${quiz_id}`,
            headers: {
                Authorization: 'Token ' + TOKEN,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            commit('UPDATE_SELECTED_QUESTION', response)
        });
    },
};

const getters = {
    getquestions: state => state.questions
};

const sidebarModule = {
    state,
    mutations,
    actions,
    getters
}

export default sidebarModule;