/* eslint-disable */
import axios from 'axios'


const VALIDATE_URL = "http://localhost:8000/api/validate/"
const TOKEN = "8ebb5a54048458a8bd73da259391a092c6627f1d" //"d88812ee582e2ab6bb0cdd93faa600541a2bcb39"


const state = {
    question: JSON.parse(localStorage.getItem('question')) || undefined,
    answer: [],
    file: '',
    result: [],
    question_no: undefined
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
        this.state.content.result = []
        this.state.content.answer = []
        commit('UPDATE_QUESTION', question)
        localStorage.setItem('question', JSON.stringify(question))
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
            },
            timeout: 2500
        })
        .then((response) => {
            if(this.getters.question.type === 'code') {
                if(response.data.status === 'running') {
                    axios({
                        method: 'get',
                        url: VALIDATE_URL + response.data.uid + "/",
                        headers: {
                            Authorization: 'Token' + TOKEN,
                        }
                    })
                    .then((response) => {
                        const result = JSON.parse(response.data.result)
                        state.commit('UPDATE_RESPONSE_RESULT', result)
                    })
                }
            }
        })
    },
    
    updateCheckedAnswers ({commit}, choices) {
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
};

const contentModule = {
    state,
    mutations,
    actions,
    getters
}

export default contentModule;