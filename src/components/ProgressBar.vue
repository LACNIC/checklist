<template>
	<div>
		<div :style="{ width: results.progress + '%' }">&nbsp;</div>
	</div>
</template>

<script setup>
	import { useResultsStore } from "@/stores/results";

	const results = useResultsStore();
</script>

<style scoped lang="scss">
	div {
		position: fixed;
		top: 0px;
		height: 2px;
		background-color: black;

		div {
			background-color: blue;
			padding: 0px;
			margin: 0px;
		}
	}

	@media print {
		div {
			display: none !important;
		}
	}
</style>
