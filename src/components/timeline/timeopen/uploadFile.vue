<template>
    <el-upload v-model:file-list="fileList" action="http://182.92.201.19:8080/api/upload" list-type="picture-card"
        :on-remove="handleRemove" :on-success="handleSuccess">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])
const props = defineProps(['modelValue'])
const emit = defineEmits()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    // 发出一个事件以将更新后的文件列表传递给父组件
    emit('update:modelValue', uploadFiles)
}
const imgList = ref([]) // 新增一个变量来存储上传的图片URL

const handleSuccess = (response, file, fileList) => {
  // 确保 response.data 是一个数组，即使它只有一个元素
  const dataArray = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
  console.log('update:modelValue', dataArray);
  dataArray.forEach(item => {
    // 创建一个新的对象，包含原始的 url 和 fileName 字段
    const newItem = {
      url: item.fileUrl,
      fileName: item.fileName,
      // 添加其他自定义字段
    };
    // 将新的对象添加到 imgList.value 中
    imgList.value.push(newItem);
  });
  // 上传成功后
  emit('update:modelValue', imgList);
}


</script>