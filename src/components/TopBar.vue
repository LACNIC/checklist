<template>
	<nav>
		<h1 id="title">{{ title }}</h1>
		<div class="buttons">
			<button id="undo" :title="t('topBar.buttons.undo')" :disabled="!results.hasUndo"
				@click="results.undo()">&#x21E0;</button>
			<button id="redo" :title="t('topBar.buttons.redo')" :disabled="!results.hasRedo"
				@click="results.redo()">&#x21E2;</button>
			<button id="config" :title="t('topBar.buttons.config')"
				@click="open">&#9881;</button>
		</div>
	</nav>
</template>

<script setup>
	import { useI18n } from "vue-i18n";
	import { useModal } from "vue-final-modal";
	import { useResultsStore } from "@/stores/results";
	import ConfigModal from "@/components/ConfigModal.vue";


	defineProps({
		title: { type: String, required: true }
	});

	const { t } = useI18n();
	const { open, close } = useModal({
		component: ConfigModal,
		attrs: { onClose() { close() } }
	});
	const results = useResultsStore();
</script>

<style scoped lang="scss">
	nav {
		display: flex;
		color: white;
		background-color: black;
		padding: 16px;
		overflow: hidden;
		position: fixed;
		top: 0px;
		width: 100%;
		height: 32px;
	}

	h1 {
		font-size: 1.6em;
		margin: 0px;
		white-space: nowrap;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		width: 100%;

		button {
			appearance: none;
			background-color: transparent;
			border: 2px solid white;
			border-radius: 12px;
			box-sizing: border-box;
			color: white;
			cursor: pointer;
			display: inline-block;
			font-size: 1.4em;
			line-height: normal;
			outline: none;
			padding: 0px 16px;
			text-align: center;
			text-decoration: none;
			user-select: none;
			width: 64px;
		}

		button:disabled {
			pointer-events: none;
			color: gray;
			border-color: gray;
		}

		button:hover {
			color: black;
			background-color: white;
			transform: translateY(-2px);
		}

		button:active {
			transform: translateY(0);
		}

		#redo {
			margin-left: 12px;
		}

		#config {
			margin-left: 36px;
			margin-right: 36px;
		}
	}

	@media only screen and (max-width: 700px) {
		#title {
			display: none;
		}
	}

	@media print {
		nav {
			display: none;
		}
	}
</style>
