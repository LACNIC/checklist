export default Object.freeze({
	//--- Data ---
	DEFAULT_DATA_ID: "test.json",

	// --- Markdown ---
	MARKED_CONFIG: { gfm: true },

	// --- i18n ---
	I18N_CONFIG: {
		legacy: false,
		locale: "en",
		fallbackLocale: "en"
	},

	// --- Checklist ---
	CHECKLIST_TIME_OPTIONS: {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	},

	// --- Local Storage ---
	LOCAL_STORAGE_DATA_ID: "sessionData",
	LOCAL_STORAGE_TTL_MS: 7 * 24 * 60 * 60 * 1000, // 7 Day
});
