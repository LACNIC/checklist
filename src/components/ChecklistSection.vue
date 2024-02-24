<template>
	<section>
		<h1>{{ id + 1 }}. {{ section.title }}</h1>
		<div v-for="(task, i) in section.tasks" :key="task">
			<checklist-task :id="i" :pid="id" :task="task" :script="script" :data="data" />
		</div>
	</section>
</template>

<script setup>
	import ChecklistTask from "@/components/ChecklistTask.vue";

	defineProps({
		id: { type: Number, required: true },
		section: { type: Object, requiered: true },
		script: { type: Object, required: true },
		data: { type: Object, required: true }
	});
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
	}
</style>
