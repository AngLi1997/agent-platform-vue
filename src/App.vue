<script setup>
import { ref } from 'vue';
import {
  UserOutlined,
  LaptopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue';

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
        {{collapsed ? logoSimpleText : logoFullText}}
      </div>
      <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined/>
              <span>流程编排</span>
            </span>
          </template>
          <a-menu-item key="1">模型管理</a-menu-item>
          <a-menu-item key="2">知识库管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <laptop-outlined/>
              <span>系统配置</span>
            </span>
          </template>
          <a-menu-item key="3">用户列表</a-menu-item>
          <a-menu-item key="4">权限设置</a-menu-item>
        </a-sub-menu>
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
        <!--        <a-row :gutter="[16, 16]">-->
        <!--          <a-col :span="8">-->
        <!--            <a-card title="数据概览" hoverable>-->
        <!--              <p>用户总数: 1,234</p>-->
        <!--              <p>今日新增: 23</p>-->
        <!--              <p>活跃用户: 456</p>-->
        <!--            </a-card>-->
        <!--          </a-col>-->
        <!--          <a-col :span="8">-->
        <!--            <a-card title="最新动态" hoverable>-->
        <!--              <a-timeline>-->
        <!--                <a-timeline-item>用户张三登录系统</a-timeline-item>-->
        <!--                <a-timeline-item>新文章发布</a-timeline-item>-->
        <!--                <a-timeline-item>系统更新完成</a-timeline-item>-->
        <!--              </a-timeline>-->
        <!--            </a-card>-->
        <!--          </a-col>-->
        <!--          <a-col :span="8">-->
        <!--            <a-card title="快捷操作" hoverable>-->
        <!--              <a-button type="primary" block>新建文章</a-button>-->
        <!--              <a-button block style="margin-top: 8px">用户审核</a-button>-->
        <!--              <a-button block style="margin-top: 8px">数据导出</a-button>-->
        <!--            </a-card>-->
        <!--          </a-col>-->
        <!--          <a-col :span="24">-->
        <!--            <a-card title="访问统计" hoverable>-->
        <!--              <div style="height: 300px">-->
        <!--                &lt;!&ndash; 这里可以放置图表 &ndash;&gt;-->
        <!--                123-->
        <!--              </div>-->
        <!--            </a-card>-->
        <!--          </a-col>-->
        <!--        </a-row>-->
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
