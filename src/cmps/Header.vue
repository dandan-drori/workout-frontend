<template>
	<section class="header">
		<router-link class="logo" to="/">Workout</router-link>
		<section class="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/workout">Workouts</router-link>
			<button class="logout" @click="onLogout">Logout</button>
		</section>
	</section>
</template>

<script>
export default {
	methods: {
		async onLogout() {
			await this.$store.dispatch('logout')
			this.$router.push('/login')
		},
	},
}
</script>
