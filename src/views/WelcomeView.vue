<script setup>

</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="8">
      <a-card title="数据概览" hoverable>
        <p>用户总数: 1,234</p>
        <p>今日新增: 23</p>
        <p>活跃用户: 456</p>
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card title="最新动态" hoverable>
        <a-timeline>
          <a-timeline-item>用户张三登录系统</a-timeline-item>
          <a-timeline-item>新文章发布</a-timeline-item>
          <a-timeline-item>系统更新完成</a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card title="快捷操作" hoverable>
        <a-button type="primary" block>新建文章</a-button>
        <a-button block style="margin-top: 8px">用户审核</a-button>
        <a-button block style="margin-top: 8px">数据导出</a-button>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="访问统计" hoverable>
        <div style="height: 300px">
          <!-- 这里可以放置图表 -->
          123
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
