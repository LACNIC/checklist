<template>
	<section>
		<h1>{{ t("checklist.roles.title") }}</h1>
		<div class="container">
			<template v-for="(p, k) in list" :key="k">
				<span class="role">{{ k }}: </span><span>{{ p }}</span>
			</template>
		</div>
	</section>
</template>

<script setup>
	import { useI18n } from "vue-i18n";

	defineProps({
		list: { type: Object, required: true }
	});

	const { t } = useI18n();
</script>

<style scoped lang="scss">
	section {
		width: 100%;

		h1 {
			font-size: 1.3em;
			background-color: black;
			color: white;
			font-weight: bold;
			padding: 6px 10px;
			margin-top: 40px;
			margin-bottom: 0px;
		}

		.container {
			display: grid;
			grid-gap: 20px;
			grid-template-columns: repeat(2, 1fr 12fr);
			padding: 14px 6px;
			border: 1px solid black;

			.role {
				font-weight: bold;
			}
		}
	}
</style>
