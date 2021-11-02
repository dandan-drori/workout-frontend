<template>
	<main class="app">
		<Header v-if="loggedinUser && !isMobile" />
		<MobileHeader v-if="loggedinUser && isMobile" />
		<UserMsg />
		<router-view />
	</main>
</template>

<script>
import Header from '@/cmps/Header'
import MobileHeader from '@/cmps/MobileHeader'
import UserMsg from '@/cmps/UserMsg'

export default {
	components: { Header, UserMsg, MobileHeader },
	computed: {
		loggedinUser() {
			return this.$store.getters.loggedinUser
		},
		isMobile() {
			return window.innerWidth < 768
		},
	},
}
</script>
