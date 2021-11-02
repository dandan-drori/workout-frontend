<template>
	<section class="edit">
		<h2 v-if="workout">{{ workout.name }} - Edit Mode</h2>
		<ul v-if="workout">
			<li v-for="exercise in workout.exercises" :key="exercise._id">
				<span>{{ exercise.name }}</span>
				<button @click="changeWeight(exercise, -1.25)">-1.25</button>
				<button @click="changeWeight(exercise, -1)">-1</button>
				<span>{{ exercise.weight }}kg</span>
				<button @click="changeWeight(exercise, 1)">+1</button>
				<button @click="changeWeight(exercise, 1.25)">+1.25</button>
			</li>
		</ul>
		<button :disabled="!isWorkoutChanged" @click="onSaveWorkout">Save</button>
	</section>
</template>

<script>
import { workoutService } from '@/services/workout-service.js'
export default {
	data() {
		return {
			workout: null,
			workoutCopy: null,
			isWorkoutChanged: false,
		}
	},
	computed: {
		workouts() {
			return this.$store.getters.workouts
		},
		savedWorkout() {
			return this.$store.getters.savedWorkout
		},
	},
	methods: {
		changeWeight(exercise, amount) {
			this.workout.exercises = this.workout.exercises.map(({ name, weight }) => {
				if (name === exercise.name) {
					if (weight + amount < 0) return { name, weight: 0 }
					let isWorkoutChanged = false
					this.workoutCopy.exercises.forEach((exerciseCopy, idx) => {
						if (exerciseCopy.name === exercise.name) {
							if (exerciseCopy.weight - amount !== this.workout.exercises[idx].weight) {
								isWorkoutChanged = true
							}
						}
					})
					this.isWorkoutChanged = isWorkoutChanged
					return { name, weight: weight + amount }
				} else {
					return { name, weight }
				}
			})
		},
		async onSaveWorkout() {
			try {
				if (!navigator.onLine) {
					this.$store.dispatch('setErrorUserMsg')
					return
				}
				await this.$store.dispatch('saveWorkout', { workout: this.workout })
				this.workout = this.savedWorkout
				this.workoutCopy = JSON.parse(JSON.stringify(this.savedWorkout))
				this.isWorkoutChanged = false
				this.$store.dispatch('setSuccessUserMsg')
			} catch (err) {
				this.$store.dispatch('setFailUserMsg')
			}
		},
	},
	async created() {
		const { id } = this.$route.params
		try {
			let workout = this.workouts.find(({ _id }) => _id === id)
			if (!workout || !Object.keys(this.workouts).length) {
				workout = await workoutService.getWorkoutById(id)
			}
			this.workout = workout
			this.workoutCopy = JSON.parse(JSON.stringify(workout))
		} catch (err) {
			console.log(err)
		}
	},
}
</script>
