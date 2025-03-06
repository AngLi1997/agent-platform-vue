<script setup>

import {PlusOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <a-row :gutter="[24, 24]">
    <a-col :span="8">
      <a-card title="创建应用" size="small">
        <div class="button-group">
          <a-button type="text" block>
            <template #icon>
              <PlusOutlined />
            </template>
            创建应用
          </a-button>
          <a-button type="text" block>
            <template #icon>
              <PlusOutlined />
            </template>
            创建工作流
          </a-button>
          <a-button type="text" block>
            <template #icon>
              <PlusOutlined />
            </template>
            创建Agent
          </a-button>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<style scoped>
.button-group button {
  text-align: left;
}
.ant-card {
  min-width: 395px;
}
</style>