<template>
	<section v-if="base64">
		<h2>{{ t("checklist.base64.title") }}</h2>
		<div class="container">
			<div class="base64">{{ base64 }}</div>
			<div class="buttons">
				<copy-button :text="base64" />
			</div>
		</div>
	</section>
</template>

<script setup>
	import { computed } from "vue";
	import { useResultsStore } from "@/stores/results";
	import { useI18n } from "vue-i18n";
	import CopyButton from "@/components/CopyButton.vue";

	const results = useResultsStore();
	const { t } = useI18n();
	const base64 = computed(() => results.progress === 100 ? results.calculateBase64()  : null);
</script>

<style scoped lang="scss">
	section {
		width: 100%;

		h2 {
			font-size: 1.3em;
			background-color: black;
			color: white;
			font-weight: bold;
			padding: 6px 10px;
			margin-top: 40px;
			margin-bottom: 0px;
		}

		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.base64 {
			font-family: Monospace;
			font-size: 0.8em;
			padding: 14px 6px;
			overflow-wrap: anywhere;
		}
	}
</style>

