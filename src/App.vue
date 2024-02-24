<template>
	<template v-if="isLoading">
		<div class="loading"><h1>Loading ...</h1></div>
	</template>
	<template v-if="hasError">
		<div class="error">
			<h1>Error</h1>
			<p>There was an error while loading the checklist; this could be because a file was not found or an error in the syntax of the file. Please view the browser console for more information.</p>
		</div>
	</template>
	<template v-else>
		<top-bar :title="title" />
		<progress-bar />
	</template>
	<div class="container">
		<router-view @loading="isLoading = true"
			@loaded="(t) => { title = t; isLoading = false; }"
			@error="() => { isLoading = false; hasError = true; }" />
	</div>
	<modals-container />
</template>

<script setup>
	import { ref } from "vue";
	import { RouterView } from "vue-router";
	import { ModalsContainer } from "vue-final-modal";
	import ProgressBar from "@/components/ProgressBar.vue";
	import TopBar from "@/components/TopBar.vue";

	const isLoading = ref(true);
	const hasError = ref(false);
	const title = ref("");
</script>

<style scoped lang="scss">
	.loading {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.error {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		p {
			width: 75%;
		}
	}

	.container {
		margin: 64px 0px 0px 0px;
		padding: 2px 6px 2px 6px;
	}

	@media print {
		.container {
			margin-top: 0px !important;
		}
	}
</style>
