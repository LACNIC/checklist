<template>
	<button v-if="isSecureConnection" @click="copyToMem">
		{{ pressed ? '&#x2713;' : '&#128203;' }}
	</button>
</template>

<script setup>
	import { ref } from "vue";

	const props = defineProps({
		text: { type: String, required: true }
	});

	const pressed = ref(false);
	const isSecureConnection = location.hostname === "localhost" || location.protocol === "https:";

	function copyToMem() {
		if (pressed.value) return;
		pressed.value = true;
		navigator.clipboard.writeText(props.text);
		setTimeout(() => pressed.value = false, 3000);
	}
</script>

<style scoped lang="scss">
	button {
		font-size: 16px;
		background-color: #eeeeee;
		border-radius: 28px;
		display: inline-block;
		cursor: pointer;
		color: darkgray;
		padding: 2px 24px;
		border: 1px solid #888;
		text-decoration: none;
		width: 64px;
		height: 28px;
	}

	button:hover {
		background-color: #dddddd;
		transform: translateY(-2px);
	}

	button:active {
		transform: translateY(0);
	}

	@media print {
		button {
			display: none;
		}
	}
</style>

