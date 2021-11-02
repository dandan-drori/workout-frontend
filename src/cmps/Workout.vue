<template>
	<section class="workout">
		<h3 class="no-workout" v-if="isNoWorkouts">
			You have no workouts.
		</h3>
		<router-link to="/workout/new">Create your first one now!</router-link>
		<section class="content" v-if="workout && !isNoWorkouts">
			<h2>{{ workout.name }}</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="exercise in workout.exercises" :key="exercise.name">
						<td>{{ exercise.name }}</td>
						<td>{{ exercise.weight }}kg</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section v-if="!workout && !isNoWorkout" class="workout-loader">
			<div class="title skeleton"></div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in skeletons" :key="i">
						<td>
							<div class="skeleton" :style="{ width: i + 'px' }"></div>
						</td>
						<td>
							<div class="skeleton" :style="{ width: i / 2 + 'px' }"></div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</section>
</template>

<script>
export default {
	props: { workout: Object },
	data() {
		return {
			skeletons: [120, 138, 119, 147, 189],
		}
	},
	computed: {
		isNoWorkouts() {
			const { name, exercises } = this.workout
			return name === 'No Workout' && !exercises.length
		},
	},
}
</script>
