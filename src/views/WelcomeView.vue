<script setup>

import {PlusOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <a-row :gutter="[24, 24]">
    <a-col :span="12">
      <a-card title="创建应用" hoverable size="small">
        <div>
          <a-button type="link">
            <template #icon>
              <PlusOutlined />
            </template>
            创建应用
          </a-button>
          <a-button type="link">
            <template #icon>
              <PlusOutlined />
            </template>
            创建工作流
          </a-button>
          <a-button type="link">
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
