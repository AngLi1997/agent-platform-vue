<script setup>
import {ref} from "vue";
import {UserOutlined} from "@ant-design/icons-vue";
import {useRoute, useRouter} from "vue-router";

defineProps({
  children: Array
})

const router = useRouter()

</script>

<template>
  <template v-for="item in children">
    <a-menu-item v-if="!item.children || item.children.length === 0" :key="item.key"
                 @click="() => router.push(item.path)">
      <span>
        <user-outlined/>
        <span>{{ item.label }}</span>
      </span>
    </a-menu-item>
    <a-sub-menu v-else :key="item.label">
      <template #title>
        <span>
          <user-outlined/>
          <span>{{ item.label }}</span>
        </span>
      </template>
      <la-dynamic-menu :children="item.children"/>
    </a-sub-menu>
  </template>
</template>

<style scoped>

</style>