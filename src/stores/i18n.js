import { defineStore } from "pinia";

export const useI18nStore = defineStore("i18n", () => {
	let instance = null;

	function init(i18n) {
		instance = i18n;
	}

	function getInstance() {
		return instance;
	}

	return { init, getInstance };
});
