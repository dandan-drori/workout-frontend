import { userService } from '@/services/user-service.js'
import { authService } from '@/services/auth-service.js'

export default {
	state: {
		loggedinUser: authService.getLoggedInUser(),
		users: [],
	},
	getters: {
		users(state) {
			return state.users
		},
		loggedinUser(state) {
			return state.loggedinUser
		},
	},
	mutations: {
		setLoggedinUser(state, { user }) {
			state.loggedinUser = user
		},
		removeUser(state, { userId }) {
			state.users = state.users.filter(u => u._id !== userId)
		},
	},
	actions: {
		async login({ commit }, { userCred }) {
			try {
				const user = await authService.login(userCred)
				commit({ type: 'setLoggedinUser', user })
				return user
			} catch (err) {
				console.log('userStore: Error in login', err)
				throw err
			}
		},
		async signup({ commit }, { userCred }) {
			try {
				const user = await authService.signup(userCred)
				commit({ type: 'setLoggedinUser', user })
				return user
			} catch (err) {
				console.log('userStore: Error in signup', err)
				throw err
			}
		},
		async logout({ commit }) {
			try {
				await authService.logout()
				commit({ type: 'setLoggedinUser', user: null })
			} catch (err) {
				console.log('userStore: Error in logout', err)
				throw err
			}
		},
		async updateUser({ commit }, { user }) {
			try {
				await userService.update(user)
				commit({ type: 'setLoggedinUser', user })
			} catch (err) {
				console.log('userStore: Error updating user', err)
				throw err
			}
		},
	},
}
