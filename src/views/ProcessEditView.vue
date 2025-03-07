<script lang="ts" setup>
import {Graph} from '@antv/x6'
import {onMounted, ref} from "vue";
import {Dnd} from "@antv/x6-plugin-dnd";
import {PlayCircleOutlined, CodeSandboxOutlined, FileSearchOutlined, CheckCircleOutlined, SearchOutlined} from "@ant-design/icons-vue";

const graph = ref<Graph>()
const dnd = ref<Dnd>()

const startDrag = (e) => {
  console.log(e)
  const react = graph.value.createNode({
    shape: 'rect',
    width: 100,
    height: 40,
    x: 300,
    y: 300
  })
  dnd.value.start(react, e)
}

onMounted(() => {
  graph.value = new Graph({
    container: document.getElementById('container'),
    autoResize: true,
    background: {
      color: '#F2F7FA',
    },
    // grid: {
    //   visible: true,
    //   type: 'doubleMesh',
    //   args: [
    //     {
    //       color: '#eee', // 主网格线颜色
    //       thickness: 1, // 主网格线宽度
    //     },
    //     {
    //       color: '#ddd', // 次网格线颜色
    //       thickness: 1, // 次网格线宽度
    //       factor: 4, // 主次网格线间隔
    //     },
    //   ],
    // },
  })
  dnd.value = new Dnd({
    target: graph.value,
    scaled: true,
    dndContainer: document.getElementById("dnd")
  })
})

</script>

<template>
  <div id="main">
    <div id="dnd">
      <a-input placeholder="搜索组件">
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-button block type="text"><PlayCircleOutlined/>开始</a-button>
      <a-button block type="text"><CodeSandboxOutlined />LLM模型</a-button>
      <a-button block type="text"><FileSearchOutlined />知识检索</a-button>
      <a-button block type="text"><CheckCircleOutlined />结束</a-button>
    </div>
    <div id="container"></div>
  </div>
</template>

<style scoped>
* {
  color: #354052;
  font-size: 14px;
}
#main {
  position: relative;
  width: 100%;
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
  background: gray;
}

#dnd {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 600px;
  z-index: 1;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 #0000;
  font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.ant-card-body {
  background: red;
}
#dnd button {
  text-align: left;
}

</style>