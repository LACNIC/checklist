<template>
	<vue-final-modal
		class="config_modal"
		content-class="config_modal_content"
		overlay-transition="vfm-fade"
		content-transition="vfm-fade">

		<h1>{{ t("config.title") }}</h1>
		<label><span>&#127760;</span> {{ t("config.language") }}</label>
		<select v-model="lang" @change="changeLanguage">
			<option value="en">English</option>
			<option value="es">Español</option>
		</select>
		<div>&nbsp;</div>
		<label><span>&#x1F4DD;</span> {{ t("config.checklist") }}</label>
		<button v-if="!clearConfirm" @click="clearConfirm = true">
			{{ t("config.clearChecklist") }}
		</button>
		<template v-else>
			<div>{{ t("config.clearConfirm") }}&nbsp;
				<span class="config_modal_link"
					@click="clearLocalStorage">{{ t("buttons.yes") }}</span> /
				<span class="config_modal_link"
					@click="clearConfirm = false">{{ t("buttons.no") }}</span>
			</div>
		</template>
	</vue-final-modal>
</template>

<script setup>
	import { ref } from "vue";
	import { VueFinalModal } from "vue-final-modal";
	import { useI18n } from "vue-i18n";
	import { useI18nStore } from "@/stores/i18n";
	import { useResultsStore } from "@/stores/results";
	import { loadLocaleMessages, setI18nLanguage } from "@/modules/i18n";

	const i18n = useI18nStore().getInstance();
	const results = useResultsStore();
	const { t, locale } = useI18n();
	const lang = ref(locale.value);
	const clearConfirm = ref(false);

	async function changeLanguage() {
		if (!i18n.global.availableLocales.includes(lang.value)) {
			await loadLocaleMessages(i18n, lang.value)
		}
		setI18nLanguage(i18n, lang.value);
	}

	function clearLocalStorage() {
		results.clearDataFromLocalStorage();
		location.reload();
	}
</script>

<style>
	.config_modal {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.config_modal_content {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		background-color: white;
		border-radius: 0.5rem;
		width: 340px;
	}

	.config_modal_content > * + * {
		margin: 0.5rem 0;
	}

	.config_modal_content h1 {
		font-size: 1.2em;
		font-weight: bold;
		text-align: center;
		padding: 12px 48px;
		color: white;
		background-color: black;
		margin: -16px -16px 16px -16px;
		border-radius: 8px 8px 0px 0px;
	}

	.config_modal_content label {
		font-weight: bold;
		margin-bottom: 0px;
	}

	.config_modal_link {
		color: blue;
	}

	.config_modal_link:hover {
		cursor: pointer;
		color: darkblue;
		text-decoration: underline;
	}
</style>
