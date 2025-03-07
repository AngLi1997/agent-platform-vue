<script lang="ts" setup>
import {SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {nextTick, reactive, ref, UnwrapRef} from "vue";
import axios from "axios";
import {TableProps} from "ant-design-vue";

const addLLMForm = ref()
const inputLLMForm = ref()
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

interface TableColumn {
  key: string,
  name: string,
  parameter_size: string,
  quantization_level:string,
  size: string,
  modified_at: string
}

const addLLMFormData : UnwrapRef<AddLLMFormData> =  reactive({
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

const importFromOllamaTableColumns = [
  {
    title: '模型名称',
    key: 'name',
    dataIndex: 'name'
  },{
    title: '参数类型',
    key: 'llmType',
    dataIndex: 'llmType'
  },{
    title: '参数大小',
    key: 'parameterSize',
    dataIndex: 'parameterSize'
  },{
    title: '量化级别',
    key: 'quantizationLevel',
    dataIndex: 'quantizationLevel'
  },{
    title: '模型大小',
    key: 'size',
    dataIndex: 'size'
  },{
    title: '更新时间',
    key: 'modifiedAt',
    dataIndex: 'modifiedAt',
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
          key: model.name,
          name: model.name,
          llmType: getLLmType(model.details.quantization_level),
          size: formatBytes(model.size),
          parameterSize: model.details.parameter_size,
          quantizationLevel: model.details.quantization_level,
          modifiedAt: formatDateWithTimezone(model.modified_at)
        }))
      })
}
const getLLmType = (quantizationLevel: string) => {
  if (quantizationLevel.startsWith("F")) {
    return "embedding"
  }else if (quantizationLevel.startsWith("Q")) {
    return "llm"
  }else {
    return null
  }
}
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: TableColumn[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};

const formatDateWithTimezone = (dateStr:string) => {
  const formattedDate = dateStr.replace(/T|\.\d+|\+.*/g, ' ');
// 替换T为空格，删除毫秒和时区部分，然后去除多余空格
  return formattedDate.trim().replace(' ', ' ');
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
const resetForm = () => {
  addLLMForm.value?.resetFields();
  inputLLMForm.value?.resetFields();
  importFromOllamaTableData.value = []
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
  <a-modal v-model:open="addLLMVisible" centered :body-style="{height: '500px', overflow: 'scroll'}" @cancel="resetForm">
    <template #title>
      添加模型
    </template>
    <a-form ref="addLLMForm" :layout="'vertical'" :model="addLLMFormData">
      <a-form-item label="模型类型" name="llmType" required>
       <a-radio-group v-model:value="addLLMFormData.llmType">
         <a-radio-button value="llm">LLM</a-radio-button>
         <a-radio-button value="embedding">Text Embedding</a-radio-button>
       </a-radio-group>
      </a-form-item>
      <a-form-item label="模型名称" name="name" required>
        <a-input v-model:value="addLLMFormData.name" placeholder="输入模型名称" />
      </a-form-item>
      <a-form-item label="基础URL" name="url" required>
        <a-input v-model:value="addLLMFormData.url" placeholder="Ollama server 的基础 URL，例如 http://127.0.0.1:11434" />
      </a-form-item>
      <a-form-item label="模型上下文长度" name="maxContentLength" required>
        <a-input-number v-model:value="addLLMFormData.maxContentLength" :min="1" />
      </a-form-item>
      <a-form-item label="最大token上限" name="maxTokenLength" required>
        <a-input-number v-model:value="addLLMFormData.maxTokenLength" />
      </a-form-item>
      <a-form-item label="是否支持Vision" name="supportVision">
        <a-radio-group v-model:value="addLLMFormData.supportVision">
          <a-radio-button value="true">是</a-radio-button>
          <a-radio-button value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否支持函数调用" name="supportFunctionCall">
        <a-radio-group v-model:value="addLLMFormData.supportFunctionCall">
          <a-radio-button value="true">是</a-radio-button>
          <a-radio-button value="false">否</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:open="importFromOllamaVisible" centered destroy-on-close width="1000px" @cancel="resetForm">
    <template #title>
      从Ollama导入
    </template>
    <a-form ref="inputLLMForm" :layout="'vertical'" :model="importFromOllamaFormData">
      <a-form-item label="基础URL" required name="url">
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
  min-width: 198px;
}
.button-group {
  flex: 1 0 calc(20% - 10px);
  min-width: 200px;
  max-width: calc(20% - 10px);
}
.llm-card {
  flex: 1 0 calc(20% - 10px);
  min-width: 200px;
  max-width: calc(20% - 10px);
  max-height: 121px;
}
.button-group button {
  text-align: left;
}
</style>