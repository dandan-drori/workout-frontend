export default {
	state: {
		userMsg: {
			msg: '',
			highlight: '',
			type: 'done',
		},
		deferredPrompt: null,
	},
	getters: {
		userMsg(state) {
			return state.userMsg
		},
	},
	mutations: {
		setUserMsg(state, userMsg) {
			state.userMsg = userMsg
		},
		setDeferredPrompt(state, deferredPrompt) {
			state.deferredPrompt = deferredPrompt
		},
	},
	actions: {
		setFetchUserMsg({ commit }) {
			commit('setUserMsg', { msg: 'Fetching', highlight: '...', type: 'fetch' })
		},
		setSuccessUserMsg({ commit, dispatch }) {
			commit('setUserMsg', {
				msg: 'Workout updated',
				highlight: ':)',
				type: 'success',
			})
			dispatch('setDoneUserMsg')
		},
		setFailUserMsg({ commit, dispatch }) {
			commit('setUserMsg', { msg: 'Workout update failed', highlight: ':(', type: 'fail' })
			dispatch('setDoneUserMsg')
		},
		setDoneUserMsg({ commit }) {
			setTimeout(() => {
				commit('setUserMsg', { msg: '', highlight: '', type: 'done' })
			}, 2000)
		},
		setErrorUserMsg({ commit, dispatch }) {
			commit('setUserMsg', { msg: 'Connection error', highlight: '!', type: 'error' })
			dispatch('setDoneUserMsg')
		},
	},
}
