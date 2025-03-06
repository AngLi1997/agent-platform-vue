<script setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
const list =[
  {
    name: "DeepSeek-r1:32b",
    icon: "https://avatars.githubusercontent.com/u/148330874?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  }
]
</script>

<template>
  <a-row :gutter="[24, 24]" style="min-width: 100%">
    <a-col :span="4" v-for="llm in list">
      <a-card hoverable class="llm-card">
        <AImage width="20px" height="20px" :src="llm.icon"/> {{ llm.name }}
        <template #actions>
          <setting-outlined key="setting" />
          <edit-outlined key="edit" />
          <ellipsis-outlined key="ellipsis" />
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.llm-card {

}
</style>