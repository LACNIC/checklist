<template>
	<header v-if="data">
		<h1>{{ data.title }}</h1>
		<div v-if="data.location">{{ data.location }}</div>
		<div v-if="data.date">{{ new Date(data.date).toLocaleDateString(locale, options) }}</div>
	</header>

	<template v-if="script">
		<template v-for="(section, i) in script.sections" :key="section">
			<checklist-section :id="i" :section="section" :script="script" :data="data" />
		</template>
	</template>
	<template v-if="data">
		<participants-section :list="data.participants" v-if="data.participants" />
		<roles-section :list="data.roles" v-if="data.roles" />
	</template>
	<results-section />
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import { useResultsStore } from "@/stores/results";
	import { useI18n } from "vue-i18n";
	import ChecklistSection from "@/components/ChecklistSection.vue";
	import ParticipantsSection from "@/components/ParticipantsSection.vue";
	import ResultsSection from "@/components/ResultsSection.vue";
	import RolesSection from "@/components/RolesSection.vue";
	import yaml from "js-yaml";
	import { replacePublicPath } from "@/modules/checklist";
	import config from "@/config";

	defineOptions({
		inheritAttrs: false
	});

	const emit = defineEmits(["loading", "loaded", "error"]);

	const route = useRoute();
	const results = useResultsStore();
	const { locale } = useI18n();
	const options = { year: 'numeric', month: 'long', day: 'numeric' };

	const id = route.params.id ? (replacePublicPath("/data/") + route.params.id) : config.DEFAULT_DATA_URL;
	const data = ref(null);
	const script = ref(null);

	function loadChecklist(url) {
		emit("loading");

		fetch(url)
			.then(resp => resp.json())
			.then(json => data.value = json)
			.then(() => fetch(replacePublicPath(data.value.script))
				.then(resp => resp.blob())
				.then(blob => blob.text())
				.then(text => yaml.load(text))
				.then(yaml => { results.init(url, yaml); return yaml })
				.then(yaml => script.value = yaml)
				.then(() => emit("loaded", data.value.title))
				.catch(e => { emit("error"); throw e; })
			)
			.catch(e => { emit("error"); throw e; });
	}

	onMounted(() => loadChecklist(id));
</script>

<style scoped lang="scss">
	header {
		text-align: right;
		margin-right: 20px;
		margin-bottom: 80px;
		/* background-image: url("@/assets/logo.svg"); */
		background-repeat: no-repeat;

		h1 {
			font-size: 1.8em;
		}
	}

	@media only screen and (max-width: 700px) {
		header {
			background-image: none;
		}
	}
</style>
