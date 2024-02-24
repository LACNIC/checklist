<template>
	<div v-if="!editIncident && text" class="incident">
		<div class="title">{{ t("checklist.task.incident.title") }}</div>
		<!-- eslint-disable vue/no-v-html -->
		<div v-html="marked.parse(text)" class="message" />
		<!-- eslint-enable-->
	</div>
	<div v-if="isCurrent" class="edit_incident">
		<template v-if="!editIncident">
			<div class="link"  style="cursor: pointer" @click.prevent="edit()">
				+ {{ t("checklist.task.incident." + (text ? "edit" : "add")) }}
			</div>
		</template>
		<template v-else>
			<div class="title">{{ t("checklist.task.incident.title") }}</div>
			<textarea v-model="text" rows="6"></textarea>
			<div class="buttons">
				<button id="delete" @click.prevent="del()">
					{{ t("buttons.delete") }}
				</button>
				<button id="save" @click.prevent="save()">
					{{ t("buttons.save") }}
				</button>
			</div>
		</template>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { marked } from "marked";
	import config from "@/config.js";

	marked.use(config.MARKED_CONFIG);

	const props = defineProps({
		id: { type: Number, required: true },
		pid: { type: Number, required: true },
		value: { type: String, required: false },
		isCurrent: { type: Boolean, required: true }
	});
	const emit = defineEmits(["editing", "updated", "deleted"]);

	const { t } = useI18n();
	const text = ref(props.value);
	const editIncident = ref(false);

	function edit() {
		editIncident.value = true;
		emit("editing");
	}

	function save() {
		editIncident.value = false;
		emit("updated", { "pid": props.pid, "id": props.id, "value": text.value });
	}

	function del() {
		text.value = null;
		editIncident.value = false;
		emit("deleted", { "pid": props.pid, "id": props.id });
	}
</script>

<style scoped lang="scss">
	.incident {
		border: 1px solid black;
		padding: 12px;
		margin-bottom: 12px;

		.title {
			font-weight: bold;
		}

		.message {
		}
	}

	.edit_incident {
		font-size: 0.9em;
		text-align: right;
		color: blue;

		.title {
			font-size: 1em;
			font-weight: bold;
			text-align: left;
			color: black;
			margin-bottom: 6px;
		}

		.link {
			text-align: left;
			margin-top: 32px;
		}

		textarea {
			width: calc(100% - 6px);
			font-size: 1em;
			margin-bottom: 12px;
		}

		button {
			color: black;
			background-color: #EEEEEE;
			border: 1px solid gray;
			padding: 2px 16px;
			margin-left: 12px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 1em;
			cursor: pointer;
		}

		button:hover {
			background-color: gray;
			color: white;
		}
	}

	@media print {
		.edit_incident {
			display: none;
		}
	}
</style>
