<template>
	<section class="workouts">
		<h2>Choose a workout to edit:</h2>
		<div class="action-container">
			<router-link to="/workout/new">Add new workout</router-link>
		</div>
		<section v-if="isNoWorkouts" class="no-workouts">
			<h3 v-if="isNoWorkouts">
				You have no workouts.
			</h3>
			<router-link to="/workout/new">Create your first one now!</router-link>
		</section>
		<section v-if="workouts && workouts.length && !isNoWorkouts" class="links">
			<router-link v-for="workout in workouts" :key="workout._id" :to="'workout/' + workout._id">
				<section>
					<button @click.prevent="onRemoveWorkout(workout._id)" :class="{ mobile: isMobile }">
						X
					</button>
					<img
						v-if="workoutsImages.includes(workout.name)"
						:src="require('../assets/' + workout.name + '.jpg')"
						alt="workout"
					/>
					<img v-else :src="require('../assets/Default.jpg')" alt="workout" />
					<p>{{ workout.name }}</p>
				</section>
			</router-link>
		</section>
		<section v-if="!workouts && !workouts.length && !isNoWorkouts" class="loader">
			<div v-for="i in 3" :key="i">
				<div class="image skeleton"></div>
				<div class="name skeleton" :style="{ width: i * 40 + 100 + 'px' }"></div>
			</div>
		</section>
		<ConfirmModal
			v-if="isModalShown"
			text="Are you sure you want to delete this workout? This action cannot be undone and you will be unable to recover any data."
			@confirm="onConfirm"
			@cancel="onCancel"
		/>
	</section>
</template>

<script>
import ConfirmModal from '@/cmps/ConfirmModal'
export default {
	components: { ConfirmModal },
	data() {
		return {
			workoutsImages: ['Back and Biceps', 'Chest and Triceps', 'Legs and Shoulders'],
			isModalShown: false,
			workoutToDeleteId: undefined,
		}
	},
	computed: {
		workouts() {
			return this.$store.getters.workouts
		},
		isMobile() {
			return window.innerWidth < 768
		},
		isNoWorkouts() {
			if (!this.workouts || !this.workouts.length) return
			const { name, exercises } = this.workouts[0]
			return name === 'No workouts' && !exercises.length
		},
	},
	methods: {
		onRemoveWorkout(workoutId) {
			this.isModalShown = true
			this.workoutToDeleteId = workoutId
		},
		async onConfirm() {
			await this.$store.dispatch('removeWorkout', this.workoutToDeleteId)
			this.$store.dispatch('loadWorkouts')
			this.isModalShown = false
			this.workoutToDeleteId = undefined
		},
		onCancel() {
			this.isModalShown = false
			this.workoutToDeleteId = undefined
		},
	},
	created() {
		this.$store.dispatch('loadWorkouts')
	},
}
</script>
