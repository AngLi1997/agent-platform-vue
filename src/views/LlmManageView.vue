<script lang="ts" setup>
import {SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {reactive, ref} from "vue";
import axios from "axios";
import {TableProps} from "ant-design-vue";
const addLLMVisible = ref(false)
const importFromOllamaVisible = ref(false)
interface AddLLMFormData {
  llmType: 'llm' | 'embedding',
  name: string,
  url: string,
  maxContentLength: number,
  maxTokenLength: number,
  supportVision: boolean,
  supportFunctionCall: boolean,
}
interface ImportFromOllamaFormData {
  url: string
}
const addLLMFormData = reactive<AddLLMFormData>({
  llmType: 'llm',
  maxContentLength: 4096,
  name: undefined,
  url: undefined,
  maxTokenLength: undefined,
  supportVision: undefined,
  supportFunctionCall: undefined,
})
const importFromOllamaFormData = reactive<ImportFromOllamaFormData>({
  url: "http://192.168.110.129:11434"
})
interface TableColumn {
  name: string,
  parameter_size: string,
  quantization_level:string,
  size: string,
  modified_at: string
}
const importFromOllamaTableColumns = [
  {
    title: '模型名称',
    key: 'name',
    dataIndex: 'name'
  },{
    title: '参数大小',
    key: 'parameter_size',
    dataIndex: 'parameter_size'
  },{
    title: '量化级别',
    key: 'quantization_level',
    dataIndex: 'quantization_level'
  },{
    title: '模型大小',
    key: 'size',
    dataIndex: 'size'
  },{
    title: '更新时间',
    key: 'modified_at',
    dataIndex: 'modified_at',
  }
]
const importFromOllamaTableData = ref([]);
const list =[
  {
    name: "DeepSeek-r1:32b",
    icon: "https://avatars.githubusercontent.com/u/148330874?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  },{
    name:"Llama3.1:latest",
    icon: "https://avatars.githubusercontent.com/u/153379578?s=200&v=4"
  }
]
const queryOllamaTagApi = (url:string) => {
  axios.get(url + "/api/tags")
      .then(res => {
        importFromOllamaTableData.value = res.data.models.map(model => ({
          name: model.name,
          size: formatBytes(model.size),
          parameter_size: model.details.parameter_size,
          quantization_level: model.details.quantization_level,
          modified_at: formatDateWithTimezone(model.modified_at)
        }))
      })
}
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: TableColumn[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};
function formatDateWithTimezone(dateStr:string) {
  const date = new Date(dateStr);
  return date.getFullYear() + '年'
      + date.getMonth() + '月'
      + date.getDate() + '日 '
      + date.getHours() + '时'
      + date.getMinutes() + '分'
      + date.getSeconds() + '秒'
}
const formatBytes = (bytes :number) =>  {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }
  // 保留两位小数，并移除末尾的零（如 1.00 → 1, 1.50 → 1.5）
  const formatted = bytes.toFixed(2).replace(/\.?0+$/, '');
  return `${formatted} ${units[index]}`;
}
</script>

<template>
  <div class="container">
    <a-card class="button-group">
      <a-button type="text" block @click="addLLMVisible = true">
        <template #icon>
          <PlusOutlined />
        </template>
        添加模型
      </a-button>
      <a-button type="text" block @click="importFromOllamaVisible = true">
        <template #icon>
          <PlusOutlined />
        </template>
        从Ollama导入
      </a-button>
    </a-card>
    <a-card hoverable class="llm-card" v-for="llm in list">
      <a-image width="20px" height="20px" :src="llm.icon" :preview="false"/> {{ llm.name }}
      <template #actions>
        <setting-outlined key="setting" />
        <delete-outlined key="delete" />
        <ellipsis-outlined key="ellipsis" />
      </template>
    </a-card>
  </div>
  <a-modal v-model:open="addLLMVisible" centered destroy-on-close :body-style="{height: '500px', overflow: 'scroll'}">
    <template #title>
      添加模型
    </template>
    <a-form :layout="'vertical'" :model="addLLMFormData">
      <a-form-item label="模型类型" required>
       <a-radio-group v-model:value="addLLMFormData.llmType">
         <a-radio-button value="llm">LLM</a-radio-button>
         <a-radio-button value="embedding">Text Embedding</a-radio-button>
       </a-radio-group>
      </a-form-item>
      <a-form-item label="模型名称" required>
        <a-input v-model:value="addLLMFormData.name" placeholder="输入模型名称" />
      </a-form-item>
      <a-form-item label="基础URL" required>
        <a-input v-model:value="addLLMFormData.url" placeholder="Ollama server 的基础 URL，例如 http://127.0.0.1:11434" />
      </a-form-item>
      <a-form-item label="模型上下文长度" required>
        <a-input-number v-model:value="addLLMFormData.maxContentLength" :min="1" />
      </a-form-item>
      <a-form-item label="最大token上限" required>
        <a-input-number v-model:value="addLLMFormData.maxTokenLength" />
      </a-form-item>
      <a-form-item label="是否支持Vision">
        <a-radio-group v-model:value="addLLMFormData.supportVision">
          <a-radio-button value="true">是</a-radio-button>
          <a-radio-button value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否支持函数调用">
        <a-radio-group v-model:value="addLLMFormData.supportFunctionCall">
          <a-radio-button value="true">是</a-radio-button>
          <a-radio-button value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:open="importFromOllamaVisible" centered destroy-on-close width="1000px">
    <template #title>
      从Ollama导入
    </template>
    <a-form :layout="'vertical'" :model="importFromOllamaFormData">
      <a-form-item label="基础URL" required>
        <a-input v-model:value="importFromOllamaFormData.url" placeholder="Ollama server 的基础 URL，例如 http://127.0.0.1:11434" />
      </a-form-item>
      <a-button @click="queryOllamaTagApi(importFromOllamaFormData.url)">导入</a-button>
      <a-table size="small" :columns="importFromOllamaTableColumns" :data-source="importFromOllamaTableData" :row-selection="rowSelection" :pagination="false" />
    </a-form>
  </a-modal>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.button-group {
  flex: 1 0 calc(25% - 10px);
  min-width: 200px;
  max-width: calc(25% - 10px);
}
.llm-card {
  flex: 1 0 calc(25% - 10px);
  min-width: 200px;
  max-width: calc(25% - 10px);
  max-height: 121px;
}
.button-group button {
  text-align: left;
}
</style>