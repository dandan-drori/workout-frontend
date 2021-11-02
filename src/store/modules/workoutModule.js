import { workoutService } from '@/services/workout-service.js'

export default {
	state: {
		currWorkout: null,
		workouts: [],
		savedWorkout: null,
	},
	getters: {
		currWorkout(state) {
			return state.currWorkout
		},
		workouts(state) {
			return state.workouts
		},
		savedWorkout(state) {
			return state.savedWorkout
		},
	},
	mutations: {
		setCurrentWorkout(state, workout) {
			state.currWorkout = workout
		},
		setWorkouts(state, workouts) {
			state.workouts = workouts
		},
		updateWorkout(state, workout) {
			state.savedWorkout = workout
			const idx = state.workouts.findIndex(({ name }) => name === workout.name)
			if (idx === -1) return
			state.workouts.splice(idx, 1, workout)
		},
		addWorkout(state, workout) {
			state.workouts.push(workout)
		},
		removeWorkout(state, workoutId) {
			const idx = state.workouts.findIndex(({ _id }) => _id === workoutId)
			if (idx === -1) return
			state.workouts.splice(idx, 1)
		},
	},
	actions: {
		async loadCurrWorkout({ commit }) {
			try {
				const workout = await workoutService.getCurrentWorkout()
				commit('setCurrentWorkout', workout)
			} catch (err) {
				console.log('Store - loadCurrWorkout', err)
				throw err
			}
		},
		async moveToNextWorkout({ commit }) {
			try {
				await workoutService.moveToNextWorkout()
			} catch (err) {
				console.log('Store - moveToNextWorkout', err)
				throw err
			}
		},
		async loadWorkouts({ commit }) {
			try {
				const workouts = await workoutService.getAllWorkouts()
				commit('setWorkouts', workouts)
			} catch (err) {
				console.log('Store - loadWorkouts', err)
				throw err
			}
		},
		async saveWorkout({ commit }, { workout }) {
			try {
				const type = workout._id ? 'updateWorkout' : 'addWorkout'
				const savedWorkout = await workoutService.saveWorkout(workout)
				commit({ type, workout: savedWorkout })
				return savedWorkout
			} catch (err) {
				console.log('Store - saveWorkout', err)
				throw err
			}
		},
		async removeWorkout({ commit }, workoutId) {
			try {
				await workoutService.removeWorkout(workoutId)
				commit('removeWorkout', workoutId)
			} catch (err) {
				console.log('Store - removeWorkout', err)
				throw err
			}
		},
	},
}
