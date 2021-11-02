<template>
	<section class="confirm-modal-container" @click="onCancel">
		<section>
			<h2>Warning!</h2>
			<p>{{ text }}</p>
			<div class="actions-container">
				<button @click.stop="onCancel">Cancel</button>
				<button @click="onConfirm">Yes, delete it!</button>
			</div>
		</section>
	</section>
</template>

<script>
export default {
	props: { text: String },
	methods: {
		onConfirm() {
			this.$emit('confirm')
		},
		onCancel() {
			this.$emit('cancel')
		},
	},
}
</script>
