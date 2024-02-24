<template>
	<div class="input">
		<div class="title">{{ label }}:</div>
		<template v-if="isCurrent">
			<input v-model="input1" type="text"
				:placeholder="t('checklist.task.input.type')"
				@keyup="sendEvent" />
			<input v-model="input2" type="text"
				:placeholder="t('checklist.task.input.retype')"
				@keyup="sendEvent" />
		</template>
		<div v-else class="value">{{ formatData(input1, format) }}</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { formatData } from "@/modules/checklist";

	const props = defineProps({
		id: { type: String, required: true },
		value: { type: String, required: false },
		label: { type: String, required: true },
		format: { type: String, required: false },
		isCurrent: { type: Boolean, required: true }
	});
	const emit = defineEmits(["updated"]);
	const { t } = useI18n();

	const input1 = ref(props.value);
	const input2 = ref(props.value);

	function sendEvent() {
		let value = null;
		if (input1.value !== "" && input1.value !== undefined &&
			input1.value === input2.value) value = input1.value;
		emit("updated", { id: props.id, value });
	}

	sendEvent();
</script>

<style scoped lang="scss">
	.input {
		display: flex;
		flex-direction: column;
		margin-bottom: 12px;

		.title {
			font-weight: bold;
			margin-top: 12px;
		}

		.value {
			font-family: Monospace;
			white-space: pre-wrap;
			margin-top: 6px;
			margin-left: 16px;
		}

		input {
			font-size: 1em;
			margin-top: 6px;
		}
	}
</style>
