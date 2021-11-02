<template>
	<section :class="'user-msg ' + userMsg.type">
		<p>
			{{ userMsg.msg }}
			<span>{{ userMsg.highlight }}</span>
		</p>
	</section>
</template>

<script>
export default {
	computed: {
		userMsg() {
			return this.$store.getters.userMsg
		},
	},
}
</script>
