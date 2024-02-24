import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import { setupI18n, loadLocaleMessages } from "./modules/i18n";
import { useI18nStore } from "./stores/i18n";
import App from "./App.vue";
import router from "./router";
import config from "./config";

const i18n = setupI18n(config.I18N_CONFIG);
await loadLocaleMessages(i18n, config.I18N_CONFIG.locale);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(createVfm());
app.mount('#app')

useI18nStore().init(i18n);
