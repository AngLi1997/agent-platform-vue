import { createRouter, createWebHistory } from 'vue-router'
import DeploymentView from "@/views/DeploymentView.vue";
import DeploymentListView from "@/views/DeploymentListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dep',
      name: 'dep',
      component: DeploymentView,
    },
    {
      path: '/depList',
      name: 'depList',
      component: DeploymentListView
    },
  ],
})

export default router
