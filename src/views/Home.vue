<template>
	<section class="home">
		<Workout v-if="currWorkout" :workout="currWorkout" />
		<button @click="moveToNextWorkout" v-if="!isNoWorkouts">
			<p>&rarr;</p>
		</button>
	</section>
</template>

<script>
import Workout from '@/cmps/Workout'
export default {
	components: { Workout },
	computed: {
		currWorkout() {
			return this.$store.getters.currWorkout
		},
		isNoWorkouts() {
			if (!this.currWorkout) return
			const { name, exercises } = this.currWorkout
			return name === 'No Workout' && !exercises.length
		},
	},
	methods: {
		async moveToNextWorkout() {
			try {
				await this.$store.dispatch('moveToNextWorkout')
				this.$store.dispatch('loadCurrWorkout')
			} catch (err) {
				console.log(err)
			}
		},
	},
	created() {
		this.$store.dispatch('loadCurrWorkout')
	},
}
</script>
