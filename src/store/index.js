import Vue from 'vue'
import Vuex from 'vuex'
import workoutModule from './modules/workoutModule.js'
import userMsgModule from './modules/userMsgModule.js'
import userModule from './modules/userModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		workoutModule,
		userMsgModule,
		userModule,
	},
})
