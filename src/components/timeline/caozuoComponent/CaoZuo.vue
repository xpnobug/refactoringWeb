<template>
  <el-popconfirm
      confirm-button-text="删除"
      cancel-button-text="修改"
      cancel-button-type="primary"
      confirm-button-type="danger"
      @confirm="confirmEvent"
      @cancel="cancelEvent"
      :hide-icon=true
  >
    <template #reference>
      <el-button>操作</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>