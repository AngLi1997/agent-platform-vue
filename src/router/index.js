import { createRouter, createWebHistory } from 'vue-router'
import DeploymentView from "@/views/DeploymentView.vue";
import DeploymentListView from "@/views/DeploymentListView.vue";
import WelcomeView from "@/views/WelcomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/depList',
      name: 'depList',
      component: DeploymentListView
    },
    {
      path: '/dep',
      name: 'dep',
      component: DeploymentView,
    },
  ],
})

export default router
