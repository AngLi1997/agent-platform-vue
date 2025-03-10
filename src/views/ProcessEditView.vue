<script lang="ts" setup>
import {Graph} from '@antv/x6'
import {onMounted, ref} from "vue";
import {Dnd} from "@antv/x6-plugin-dnd";
import {
  PlayCircleOutlined,
  CodeSandboxOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  GlobalOutlined
} from "@ant-design/icons-vue";
import {Snapline} from "@antv/x6-plugin-snapline";
import {Selection} from "@antv/x6-plugin-selection";
import {Clipboard} from "@antv/x6-plugin-clipboard";
import {register} from "@antv/x6-vue-shape";
import LLMNode from "./nodes/LLMNode.vue";
import StartNode from "./nodes/StartNode.vue";
import EndNode from "./nodes/EndNode.vue";
import KnowledgeNode from "./nodes/KnowledgeNode.vue";
import {Keyboard} from "@antv/x6-plugin-keyboard";
import {message} from "ant-design-vue";
import {History} from "@antv/x6-plugin-history";
import SearchOnWebNode from "./nodes/SearchOnWebNode.vue";

const graph = ref<Graph>()
const dnd = ref<Dnd>()

const processNodeList = [{
  nodeType: 'StartNode',
  component: StartNode,
  width: 70
}, {
  nodeType: 'LLMNode',
  component: LLMNode,
  height: 75
}, {
  nodeType: 'SearchOnWebNode',
  component: SearchOnWebNode
}, {
  nodeType: 'KnowledgeNode',
  component: KnowledgeNode
}, {
  nodeType: 'EndNode',
  component: EndNode,
  width: 70
}]

processNodeList.forEach((processNodeListElement) => {
  register({
    shape: processNodeListElement.nodeType,
    component: processNodeListElement.component,
    width: processNodeListElement.width || 250,
    height: processNodeListElement.height || 50,
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#8f8f8f',
            }
          }
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#8f8f8f',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {id: 'top', group: 'top'},
        {id: 'bottom', group: 'bottom'},
        {id: 'left', group: 'left'},
        {id: 'right', group: 'right'},
      ]
    }
  })
})

const startDrag = (e: any, nodeType: string) => {
  const react = graph.value.createNode({
    shape: nodeType
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
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1, // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
    connecting: {
      snap: {
        radius: 20
      },
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      allowMulti: false
    }
  })
  graph.value.use(new Snapline({enabled: true}))
  graph.value.use(new Selection({
    enabled: true,
    showNodeSelectionBox: true,
    showEdgeSelectionBox: true,
    pointerEvents: 'none',
    rubberband: true
  }))
  graph.value.use(new Clipboard({enabled: true, useLocalStorage: true}))
  graph.value.use(new History({
    enabled: true
  }))
  graph.value.use(new Keyboard({
    enabled: true,
    global: true
  }))

  graph.value.bindKey(['ctrl+c', 'command+c'], () => {
    const cells = graph.value.getSelectedCells()
    if (cells && cells.length) {
      graph.value.copy(cells)
      message.success('复制成功')
    }
  })
  graph.value.bindKey(['ctrl+v', 'command+v'], () => {
    if (graph.value.isClipboardEmpty()) {
      message.info('剪切板为空，不可粘贴')
    } else {
      const cells = graph.value.paste()
      graph.value.cleanSelection()
      graph.value.select(cells)
      message.success('粘贴成功')
    }
  })
  graph.value.bindKey(['backspace'], () => {
    const cells = graph.value.getSelectedCells()
    if (cells && cells.length) {
      graph.value.removeCells(cells)
      message.success('删除成功')
    }
  })

  graph.value.bindKey(['ctrl+a', 'command+a'], () => {
    graph.value.select(graph.value.getCells())
  })
  graph.value.bindKey(['ctrl+z', 'command+z'], () => {
    if (graph.value.canUndo){
      graph.value.undo()
    }
  })
  graph.value.bindKey(['ctrl+shift+z', 'command+shift+z'], () => {
    if (graph.value.canRedo){
      graph.value.redo()
    }
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
          <SearchOutlined/>
        </template>
      </a-input>
      <a-button @mousedown="(e:any)=> startDrag(e, 'StartNode')" block type="text">
        <PlayCircleOutlined/>
        开始
      </a-button>
      <a-button @mousedown="(e:any)=> startDrag(e, 'LLMNode')" block type="text">
        <CodeSandboxOutlined/>
        LLM模型
      </a-button>
      <a-button @mousedown="(e:any)=> startDrag(e, 'SearchOnWebNode')" block type="text">
        <GlobalOutlined />
        联网搜索
      </a-button>
      <a-button @mousedown="(e:any)=> startDrag(e, 'KnowledgeNode')" block type="text">
        <FileSearchOutlined/>
        知识检索
      </a-button>
      <a-button @mousedown="(e:any)=> startDrag(e, 'EndNode')" block type="text">
        <CheckCircleOutlined/>
        结束
      </a-button>
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
  top: 50px;
  left: 20px;
  width: 200px;
  height: 600px;
  z-index: 1;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 #0000;
}

.ant-card-body {
  background: red;
}

#dnd button {
  text-align: left;
}

</style>