<script setup>
import {ref} from 'vue';
import {
  UserOutlined,
  LaptopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';
import LaDynamicMenu from "@/components/LaDynamicMenu.vue";
import menuData from "@/menuData.js";

// 响应式状态
const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])
const collapsed = ref(false)
const logoFullText = "DeepSeek-R1:32b"
const logoSimpleText = "D"
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- 左侧菜单 -->
    <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
    >
      <div class="logo">
        {{ collapsed ? logoSimpleText : logoFullText }}
      </div>
      <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
      >
        <la-dynamic-menu :children="menuData"/>
      </a-menu>
    </a-layout-sider>

    <!-- 右侧内容区域 -->
    <a-layout>
      <!-- 头部 -->
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => collapsed = !collapsed"
        />
        <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => collapsed = !collapsed"
        />
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content style="margin: 24px 16px; padding: 24px; background: #fff">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  color: white;
  text-align: center;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
