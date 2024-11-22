import { createRouter, createWebHistory } from "vue-router";
import ChecklistView from "@/views/ChecklistView.vue";
import { replacePublicPath } from "@/modules/checklist";
import config from "@/config";

const routes = [
	{ path: replacePublicPath("/"), redirect: replacePublicPath("/checklists/") + config.DEFAULT_DATA_ID },
	{ path: replacePublicPath("/checklists/:id"), component: ChecklistView }
];


const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
