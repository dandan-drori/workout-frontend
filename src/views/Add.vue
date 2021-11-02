<template>
	<section class="add">
		<h2>Add New Workout</h2>
		<form @submit.prevent="onSaveWorkout">
			<div>
				<input
					type="text"
					name="workout-name"
					@blur="onBlur"
					autocomplete="off"
					v-model="workout.name"
				/>
				<span class="placeholder" @click="onFocusPlaceholder">Workout name</span>
			</div>
			<section v-for="(exercise, idx) in workout.exercises" :key="idx">
				<div>
					<input
						type="text"
						name="exercise-name"
						@blur="onBlur"
						autocomplete="off"
						v-model="workout.exercises[idx].name"
					/>
					<span class="placeholder" @click="onFocusPlaceholder">Exercise name</span>
				</div>
				<div>
					<input
						type="number"
						name="exercise-weight"
						autocomplete="off"
						@blur="onBlur"
						v-model="workout.exercises[idx].weight"
					/>
					<span class="placeholder" @click="onFocusPlaceholder">Weight (kg)</span>
				</div>
				<button @click="onRemoveExercise(idx)">X</button>
			</section>
			<button type="button" @click="onAddExercise">+</button>
			<button>Save Workout</button>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			workout: {
				name: '',
				exercises: [{ name: '', weight: 0 }],
			},
		}
	},
	computed: {},
	methods: {
		onAddExercise() {
			this.workout.exercises.push({ name: '', weight: 0 })
		},
		async onSaveWorkout() {
			if (!this.workout.exercises.length) return
			const inputEls = document.querySelectorAll('input')
			let isEmpty = false
			inputEls.forEach(input => {
				if (!input.value) isEmpty = true
			})
			if (!isEmpty) {
				this.workout.exercises = this.workout.exercises.map(({ name, weight }) => {
					return { name, weight: +weight }
				})
				try {
					this.$store.dispatch('setFetchUserMsg')
					await this.$store.dispatch('saveWorkout', { workout: this.workout })
					this.$store.dispatch('setSuccessUserMsg')
				} catch (err) {
					this.$store.dispatch('setFailUserMsg')
				}
			}
		},
		onFocusPlaceholder(e) {
			e.target.previousSibling.focus()
			e.target.style.animation = 'shrink 0.3s ease-in-out forwards'
		},
		onBlur(e) {
			if (e.target.value) return
			const placeholderEl = e.target.nextSibling
			placeholderEl.style.animation = 'expand 0.3s ease-in-out forwards'
		},
		onRemoveExercise(idx) {
			this.workout.exercises.splice(idx, 1)
		},
	},
}
</script>
