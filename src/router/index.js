import { createRouter, createWebHistory } from "vue-router";
import ChecklistView from "@/views/ChecklistView.vue";
import config from "@/config";

const routes = [
	{ path: "/", redirect: "/checklists/" + config.DEFAULT_DATA_ID },
	{ path: "/checklists/:id", component: ChecklistView }
];


const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
