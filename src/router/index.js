import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from "@/views/WelcomeView.vue";
import LLMManageView from "@/views/LlmManageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard/welcome',
      name: 'welcome',
      component: WelcomeView,
    },{
      path: '/flow/llm',
      name: 'llm',
      component: LLMManageView,
    }
  ],
})

export default router
