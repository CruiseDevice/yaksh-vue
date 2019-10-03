/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

import sidebar from './sidebar/index.js';
import content from './content/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sidebar,
        content,
    }
});