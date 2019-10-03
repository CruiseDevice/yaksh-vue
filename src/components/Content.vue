<template>
    <div>
        <div id="content" v-if="question">
            <div class="card">
                <div class="card-header">
                    {{question.id}}. <h5><strong>{{question.summary}}</strong></h5>
                        <strong>{{question.type}}</strong>
                </div>
                <div class="card-body">
                    <p v-html="question.description"></p>
                </div>
            </div>
            <div class="card" >
                <div class="card-body">
<!--                     <form @submit="submitForm">
                        <input type="number" name="" :value="answer" v-if="question.type=='integer' || question.type=='float'">
                        <textarea v-if="question.type=='string'" :value="answer"></textarea>
                        <div class="form-group" v-if="question.type=='code'">

                             <textarea id="editor" v-if="question.type=='code'"></textarea> //comment this line.

                            <textarea id="codemirror1" :value="answer"></textarea>
                        </div>
                        <input type="file" v-if="question.type=='upload'" ref="file" @change="handleFileUpload()" id="file" name="">
                        <div v-if="question.type=='mcc'">
                            <div v-for="testcases in question.test_cases" :key="testcases.id">
                                <input type="checkbox" :value="testcases.id" name=""> {{testcases.options}}
                            </div>
                        </div>
                        <div v-if="question.type=='mcq'">
                            <div v-for="testcases in question.test_cases" :key="testcases.id">
                                <input type="radio" :value="testcases.id" name=""> {{testcases.options}}
                            </div>
                        </div>
                        <div v-if="question.type=='arrange'">
                            <draggable :value="question.test_cases" @start="drag=true" @end="drag=false">
                                <div v-for="testcases in question.test_cases" :key="testcases.id">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            {{testcases.options}}
                                        </li>
                                    </ul>
                                </div>
                            </draggable>
                        </div>
                        <br>
                        <br>
                        <button v-if="question.type=='upload'" v-on:click="submitFile()" class="btn btn-success">Upload</button>
                        <button v-else class="btn btn-success">Submit</button>
                        <button class="btn btn-primary">Attempt Later</button>
                    </form> -->
                    <form @submit="submitForm">
                        <input ref="answer" v-if="question.type=='integer' || question.type=='float'">
                        <textarea v-if="question.type=='string'" ref="answer"></textarea>
                        <div class="form-group" v-if="question.type=='code'">
                            <textarea id="codemirror1" ref="answer"></textarea>
                        </div>
                        <div v-if="question.type=='mcq'">
                            <div v-for="testcases in question.test_cases" :key="testcases.id">
                                <input type="radio" ref="testcases.id"> {{testcases.options}}
                            </div>
                        </div>
                        <div v-if="question.type=='mcc'">
                            <div v-for="testcases in question.test_cases" :key="testcases.id">
                                <input type="checkbox" :value="testcases.options" :id="testcases.id" @change="updateCheckedAnswers" > {{testcases.options}}
                            </div>
                        </div>
                        <input type="file" v-if="question.type=='upload'" ref="file" @change="handleFileUpload()" id="file" name="">
                        <div v-if="question.type=='arrange'">
                            <draggable @start="drag=true" @end="handleDrop" v-model="question.test_cases">
                                <div v-for="testcases in question.test_cases" :id="testcases.options.id" :key="testcases.id">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            {{testcases.options}}
                                        </li>
                                    </ul>
                                </div>
                            </draggable>
                        </div>
                        <br>
                        <br>
                        <button class="btn btn-success">Submit</button>
                        <button class="btn btn-primary">Attempt Later</button>
                    </form>
                </div>
            </div>
            <div>
            </div>
            <div class="card" v-for='(error, index) in result.error'>
                <div class="card-header alert-danger">Error No. {{index+1}}</div>
                <div class="card-body">
                    <p>The Following error took place: </p>
                    <table class="table table-borderless border border-danger table-responsive-sm" width="100%">
                        <col width="30%">
                        <tr class="bg-light">
                            <td><b>Exception Name: </b></td>
                            <td><span class="text-danger">{{error.exception}}</span></td>
                        </tr>
                        <tr>
                            <td><b>Exception Message:</b></td>
                            <td>{{error.message}}</td>
                        </tr>
                        <tr>
                            <td><b>Full Trace:</b></td>
                            <td>{{error.traceback}}</td>
                        </tr>
                        <tr>
                            <td><strong> We tried your code with the following test case:</strong></td>
                            <td>{{error.test_case}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {mapGetters, mapActions, mapState} from 'vuex'
import draggable from 'vuedraggable'

export default {
    name: 'Content',
    computed: {
        ...mapGetters(['question', 'answer', 'result', 'check_result', 'resultMessage']),
    },
    created () {
        this.$store.dispatch('showQuestion')
    },
    methods: {
        ...mapActions(['handleFileUpload', 'submitForm']),
        submitForm (e) {
            e.preventDefault()
            if(this.question.type === 'mcc'){
                const answer = this.answer
                this.$store.dispatch('submitAnswer')
            }else if(this.question.type === 'upload'){
                this.$store.dispatch('submitFile')
            }else if(this.question.type === 'arrange'){
                this.$store.dispatch('submitAnswer')    
            }else{
                const answer = this.$refs.answer.value
                this.$store.commit('UPDATE_ANSWER', answer)
                this.$store.dispatch('submitAnswer')
            }
        },
        updateCheckedAnswers (e) {
            e.preventDefault()
            this.$store.dispatch('updateCheckedAnswers', e.target)
        },    
        handleFileUpload (e) {
            const file = this.$refs.file.files[0];
            this.$store.commit('UPDATE_FILE', file)
        },
        handleDrop (e){
            const answer = this.question.test_cases
            this.$store.commit('UPDATE_ARRANGE', answer)
        }

    },
    components: {
        draggable,
    },
}
</script>
<style scoped>
#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
}

.form-group {
  margin-bottom: 25px;
}

.CodeMirror {
  padding: 8px 0;
  text-align: left;
  position: relative;
  z-index: 999;
  height: auto;
}
</style>