import { httpService } from './http-service.js'

export const workoutService = {
	getCurrentWorkout,
	moveToNextWorkout,
	getWorkoutById,
	saveWorkout,
	removeWorkout,
	getAllWorkouts,
}

async function getCurrentWorkout() {
	try {
		return await httpService.get('workout')
	} catch (err) {
		throw err
	}
}

async function moveToNextWorkout() {
	try {
		return await httpService.get('workout/move')
	} catch (err) {
		throw err
	}
}

async function getAllWorkouts() {
	try {
		return await httpService.get('workout/all')
	} catch (err) {
		throw err
	}
}

async function getWorkoutById(id) {
	try {
		return await httpService.get('workout/' + id)
	} catch (err) {
		throw err
	}
}

async function saveWorkout(workout) {
	try {
		if (workout._id) {
			return await httpService.put('workout', workout)
		} else {
			return await httpService.post('workout', workout)
		}
	} catch (err) {
		throw err
	}
}

async function removeWorkout(id) {
	try {
		return await httpService.delete('workout/' + id)
	} catch (err) {
		throw err
	}
}
