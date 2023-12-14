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
    console.log(response.data.fileUrl, file, fileList)
    // 将上传的图片URL添加到imgList中
    imgList.value.push(response.data.fileUrl);

    // 上传成功后
    emit('update:modelValue', imgList)
}
</script>