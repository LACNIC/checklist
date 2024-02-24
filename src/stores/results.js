import { ref, computed } from "vue";
import { defineStore } from "pinia";
import config from "@/config.js";

export const useResultsStore = defineStore("results", () => {
	const key = (pid, tid) => pid + "." + tid;

	const id = ref(null);
	const index = ref([]);
	const timestamps = ref({});
	const current = ref(0);
	const deep = ref(0);
	const incidents = ref({});
	const inputs = ref({});

	const progress = computed(() =>
		index.value.length === 0 ? 0 : Math.ceil(100 * current.value / index.value.length));
	const hasUndo = computed(() => current.value > 0);
	const hasRedo = computed(() => current.value < deep.value);

	function init(did, script) {
		clearData(did);
		deleteExpiredLocalStorage();
		loadDataFromLocalStorage();
		if (id.value !== did) {
			clearData(did);
			clearDataFromLocalStorage();
		}

		for (let i = 0; i < script.sections.length; i++) {
			for (let j = 0; j < script.sections[i].tasks.length; j++) {
				index.value.push(key(i, j));
			}
		}
	}

	function clearData(did) {
		id.value = did;
		index.value = [];
		timestamps.value = {};
		current.value = 0;
		deep.value = 0;
		incidents.value = {};
		inputs.value = {};
	}

	function isCurrent(pid, tid) {
		return index.value[current.value] === key(pid, tid);
	}

	function isDone(pid, tid) {
		return index.value.indexOf(key(pid, tid)) < current.value;
	}

	function check(pid, tid) {
		const id = key(pid, tid);
		timestamps.value[id] = Date.now();
		current.value += 1;
		deep.value = current.value;
		saveDataToLocalStorage();
	}

	function undo() {
		if (current.value === 0) return;
		current.value--;
		saveDataToLocalStorage();
	}

	function redo() {
		if (current.value === deep.value) return;
		current.value++;
		saveDataToLocalStorage();
	}

	function getTimestamp(pid, tid) {
		const time = timestamps.value[key(pid, tid)];
		if (time === undefined) return undefined;
		const date = new Date(time);
		return date.toLocaleString("en", config.CHECKLIST_TIME_OPTIONS).substring(0, 8);
	}

	function setIncident(pid, tid, text) {
		incidents.value[key(pid, tid)] = text;
	}

	function remIncident(pid, tid) {
		delete incidents.value[key(pid, tid)];
	}

	function getIncident(pid, tid) {
		return incidents.value[key(pid, tid)];
	}

	function setInput(id, value) {
		inputs.value[id] = value;
	}

	function getInput(id) {
		return inputs.value[id];
	}

	function calculateBase64() {
		const input = new TextEncoder().encode(JSON.stringify(inputs.value));
		const bin = String.fromCodePoint(...input);
		return btoa(bin);
	}

	function saveDataToLocalStorage() {
		const data = {
			id: id.value,
			timestamps: timestamps.value,
			current: current.value,
			deep: deep.value,
			incidents: incidents.value,
			inputs: inputs.value,
			created: Date.now()
		};
		localStorage.setItem(config.LOCAL_STORAGE_DATA_ID, JSON.stringify(data));
	}

	function loadDataFromLocalStorage() {
		const data = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_DATA_ID));
		if (data) {
			id.value = data.id;
			timestamps.value = data.timestamps;
			current.value = data.current;
			deep.value = data.deep;
			incidents.value = data.incidents;
			inputs.value = data.inputs;
		}
	}

	function clearDataFromLocalStorage() {
		localStorage.removeItem(config.LOCAL_STORAGE_DATA_ID);
	}

	function deleteExpiredLocalStorage() {
		const data = JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_DATA_ID));
		if (data) {
			const delta = Date.now() - data.created;
			if (delta >= config.LOCAL_STORAGE_TTL_MS) {
				localStorage.removeItem(config.LOCAL_STORAGE_DATA_ID);
			}
		}
	}

	return {
		init, progress, hasUndo, hasRedo, isCurrent, isDone,
		check, undo, redo, getTimestamp,
		setIncident, remIncident, getIncident,
		setInput, getInput, calculateBase64,
		clearDataFromLocalStorage
	};
});
