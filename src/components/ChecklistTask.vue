<template>
	<div class="container"
		:class="{ done: results.isDone(pid, id), current: results.isCurrent(pid, id) }">
		<div class="id">{{ pid + 1 }}.{{ id + 1 }}.</div>
		<div class="content">
			<!-- Task: Message --->
			<!-- eslint-disable vue/no-v-html -->
			<div class="message" v-html="marked.parse(task.msg)" />
			<!-- eslint-enable-->
			<!-- Task: Code -->
			<div class="code_container" v-if="task.code">
				<copy-button v-if="results.isCurrent(pid, id)" :text="task.code" />
				<p class="code">{{ task.code }}</p>
			</div>
			<!-- Task: Output -->
			<div v-if="task.output" class="output">
				<div class="title">{{ script.data[task.output].label }}:</div>
				<div class="value">
					{{ formatData(data.data[task.output], script.data[task.output].format) }}
				</div>
			</div>
			<!-- Task: Input -->
			<checklist-task-input v-if="task.input"
				:id="task.input" :value="results.getInput(task.input)"
				:label="script.data[task.input].label"
				:format="script.data[task.input].format"
				:isCurrent="results.isCurrent(pid, id)"
				@updated="inputUpdated" />
			<!-- Task: Expected -->
			<div v-if="task.expected && results.isCurrent(pid, id)" class="expected">
				<div class="title">{{ t("checklist.task.expected.title") }}</div>
				<!-- eslint-disable vue/no-v-html -->
				<div v-if="task.expected.msg" class="message" v-html="marked.parse(task.expected.msg)" />
				<!-- eslint-enable-->
				<pre v-if="task.expected.code" class="code">{{ task.expected.code }}</pre>
			</div>
			<!-- Task: Incident -->
			<checklist-task-incident
				:pid="pid" :id="id" :value="results.getIncident(pid, id)"
				:isCurrent="results.isCurrent(pid, id)"
				@editing="editIncident" @updated="updateIncident" @deleted="deleteIncident" />
		</div>
		<div class="time">
			<div v-if="results.isDone(pid, id)">
				{{ results.getTimestamp(pid, id) }}
			</div>
			<button
				v-if="results.isCurrent(pid, id)"
				:title="t('checklist.task.buttons.check')"
				:disabled="disableCheckButton"
				@click.prevent="results.check(pid, id)">&#x2713;</button>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { marked } from "marked";
	import { useResultsStore } from "@/stores/results";
	import { formatData } from "@/modules/checklist";
	import ChecklistTaskInput from "@/components/ChecklistTaskInput.vue";
	import ChecklistTaskIncident from "@/components/ChecklistTaskIncident.vue";
	import CopyButton from "@/components/CopyButton.vue";
	import config from "@/config.js";

	marked.use(config.MARKED_CONFIG);

	defineProps({
		id: { type: Number, required: true },
		pid: { type: Number, required: true },
		task: { type: Object, required: true },
		script: { type: Object, required: true },
		data: { type: Object, required: true }
	});

	const { t } = useI18n();
	const results = useResultsStore();
	const disableCheckButton = ref(false);

	function editIncident() {
		disableCheckButton.value = true;
	}

	function updateIncident(event) {
		results.setIncident(event.pid, event.id, event.value);
		disableCheckButton.value = false;
	}

	function deleteIncident(event) {
		results.remIncident(event.pid, event.id);
		disableCheckButton.value = false;
	}

	function inputUpdated(event) {
		disableCheckButton.value = event.value === null;
		if (event.value !== null)
			results.setInput(event.id, event.value);
	}
</script>

<style scoped lang="scss">
	.current {
		background-color: #FFFFDA;
	}

	.done {
		background-color: #DDD;
	}

	.container {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 14px 6px;
		border-left: 1px solid black;
		border-right: 1px solid black;
		border-bottom: 1px solid black;
		min-height: 32px;

		.id {
			width: 64px;
		}

		.content {
			width: calc(100% - 64px - 120px);
			text-align: justify;
			margin: -16px 0px 2px 0px;
			padding-right: 6px;

			.message {
			}

			.code_container {
				text-align: right;

				.code {
					font-family: Monospace;
					font-size: 0.9em;
					text-align: left;
					white-space: pre;
					background-color: #DDD;
					border: 1px solid black;
					padding: 6px 10px;
					overflow-x: scroll;
				}
			}

			.output {
				.title {
					font-weight: bold;
					margin-top: 24px;
				}

				.value {
					font-family: Monospace;
					white-space: pre-wrap;
					margin-top: 6px;
					margin-left: 16px;
				}
			}

			.expected {
				border: 1px solid black;
				background-color: lightgreen;
				padding: 12px;
				margin-bottom: 12px;

				.title {
					font-weight: bold;
				}

				.message {
				}

				.code {
					background-color: transparent;
					border: 0px;
					overflow-x: scroll;
				}
			}
		}

		.time {
			width: 120px;
			display: flex;
			align-items: center;
			justify-content: center;

			button {
				font-size: 18px;
				font-weight: bold;
				background-color: #44C767;
				border-radius: 12px;
				border: 1px solid #18AB29;
				display: inline-block;
				cursor: pointer;
				color: white;
				padding: 2px 20px;
				text-decoration: none;
				text-shadow: 0px 1px 0px #2F6627;
			}

			button:hover {
				background-color: #5CBF2A;
				transform: translateY(-2px);
			}

			button:active {
				transform: translateY(-2px);
			}

			button:disabled {
				pointer-events: none;
				color: gray;
				background-color: lightgray;
				border-color: gray;
			}
		}
	}

	@media only screen and (max-width: 700px) {
		.container {
			.content {
				text-align: left !important;
			}

			.time {
				width: 80px !important;
			}
		}
	}

	@media print {
		.container {
			.content {
				.code {
					white-space: pre-wrap;
				}

				.expected {
					display: none;
				}
			}

			.time {
				button {
					display: none;
				}
			}
		}

		.current, .done {
			background-color: transparent !important;
		}
	}
</style>
