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
  <!-- 根据 ghType 的值动态渲染组件 -->
  <JtUpdate v-if="ghType === '1'" ref="updateComponent" :ghid="ghid" :ghType="ghType" name="修改" type="1"></JtUpdate>
  <JdUpdate v-if="ghType === '2'" ref="updateComponent" :ghid="ghid" :ghType="ghType" name="修改" type="2"></JdUpdate>
</template>

<script setup lang="ts">
import { ref, toRefs, inject } from 'vue';
import JdUpdate from "../timeopen/jd-update.vue";
import JtUpdate from "../timeopen/jt-update.vue";
import {useRoute} from "vue-router";
import { delDetailsInfo } from '../../../api/travelGh';
import {ElMessage} from "element-plus";

const route = useRoute()
const updateComponent = ref(null); // Reference to the update component


//获取到要修改的id传给子组件
const props = defineProps(['ghid','ghType']);
const initList = inject('initList');
const { ghid } = toRefs(props);
const { ghType } = toRefs(props);
//修改
const cancelEvent = () => {
  if (updateComponent.value) {
    updateComponent.value.openDrawer();
  }
}
//删除
const confirmEvent = () => {
  delDetailsInfo(ghid.value)
  setTimeout(() => {
    ElMessage.success('删除成功！！')
    // 调用更新页面的方法
    initList()
  }, 1000)
}

</script>