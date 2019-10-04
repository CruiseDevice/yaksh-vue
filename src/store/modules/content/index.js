/* eslint-disable */
import axios from 'axios'

import {VALIDATE_URL, TOKEN}  from './../../../../config/dev.env.js'

// console.log(VALIDATE_URL, TOKEN)

const state = {
    question: undefined,
    answer: [],
    file: '',
    result: [],
};

const mutations = {
    UPDATE_QUESTION (state, payload) {
        state.question = payload
    },
    UPDATE_ANSWER (state, payload) {
        state.answer = payload
    },
    UPDATE_CHECKED_ANSWERS (state, payload) {
        state.answer.push(payload)
    },
    REMOVE_CHECKED_ANSWERS (state, payload) {
        state.answer = state.answer.filter(ans => {
            return ans != payload.id
        })
    },
    UPDATE_FILE (state, payload) {
        state.file = payload
    },
    UPDATE_ARRANGE (state, payload) {
        state.answer = payload
    },
    UPDATE_RESPONSE_RESULT (state, payload) {
        state.result = payload
    }
};

const actions = {
    showQuestion({commit}, question) {
        commit('UPDATE_QUESTION', question)
    },
    
    checkAnswerStatus (response) {
        console.log(response)
    },

    async submitAnswer(state){
        const answerPaperId = state.rootState.sidebar.questions.id
        const answer = this.getters.answer
        const questionID = this.getters.question.id
        axios({
            method: 'post',
            url:VALIDATE_URL + answerPaperId + "/" + questionID + "/",
            headers: {
                Authorization: 'Token ' + TOKEN, //the token is a variable which holds the token
            },
            data:{
                answer: answer
            }
        })
        .then((response) => {
            if(this.getters.question.type === 'code') {
                if(response.data.status === 'running') {
                    setTimeout(() => {
                        axios({
                            method: 'get',
                            url: VALIDATE_URL + response.data.uid + "/",
                            headers: {
                                Authorization: 'Token' + TOKEN,
                            }
                        })
                        .then((response) => {
                            // console.log(response)
                            // console.log(this.getters.result)
                            const result = JSON.parse(response.data.result)
                            console.log(result.error)
                            state.commit('UPDATE_RESPONSE_RESULT', result)
                        })
                    }, 1500)
                }
            }
        })
    },
    
    updateCheckedAnswers ({commit}, choices) {
        console.log(choices)
        if(choices.checked) {
            commit('UPDATE_CHECKED_ANSWERS', choices.id)
        } else {
            commit('REMOVE_CHECKED_ANSWERS', choices)
        }
    },

    submitFile (state) {
        const answerPaperId = state.rootState.sidebar.questions.id
        const answer = this.getters.answer
        const questionID = this.getters.question.id
        let formData = new FormData();
        formData.append('file', this.file);
        console.log(formData)
        axios({
            method: 'post',
            url: VALIDATE_URL + answerPaperId + "/" + questionID + "/",
            headers: {
                Authorization: 'Token ' + TOKEN, //the token is a variable which holds the token
            },
            data: {
                answer: formData
            }
        })
        .then((response) => {
            console.log(response)
        })
    }
};

const getters = {
    question: state => state.question,
    answer: state => state.answer,
    result: state => state.result,
    check_result: state => {
        return typeof state.result !== 'undefined' && state.result.length > 0
    },
    resultMessage: state => {
        // for(const [key, value] of Object.entries(state.result)){
        //     console.log(key, value)
        // }
    }
};

const contentModule = {
    state,
    mutations,
    actions,
    getters
}

export default contentModule;