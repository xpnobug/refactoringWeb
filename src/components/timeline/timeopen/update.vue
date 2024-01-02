<template>
  <el-drawer ref="drawerRef" v-model="dialog" :title="name" direction="ltr" class="demo-drawer" size="100%">
    <div class="demo-drawer__content">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" :label-position="labelPosition"
               :size="size" status-icon>
        <el-form-item label="" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题名称" />
        </el-form-item>

        <el-form-item label="" prop="startTime">
          <!-- <el-col :span="11">
              <el-date-picker v-model="sizeForm.date1" type="date" label="Pick a date" placeholder="请输入发生时间"
                  style="width: 100%" />
          </el-col>
          <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col> -->
          <el-col :span="11">
            <el-time-picker v-model="ruleForm.startTime" label="Pick a time" placeholder="请输入发生时间"
                            style="width: 100%" value-format="HH:mm" />
          </el-col>
        </el-form-item>
        <el-form-item prop="description">
          <QuillEditor @handleRichTextContentChange="onContentChange" />
          <!-- <el-input v-model="ruleForm.description" placeholder="请输入描述" type="textarea" :rows="4" /> -->
        </el-form-item>
        <Upload v-model:modelValue="ruleForm.imgList" />
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, inject } from 'vue'
import { ElDrawer, ElMessageBox, ElMessage, FormInstance, FormRules } from 'element-plus'
import Upload from './uploadFile.vue';
import QuillEditor from '../../QuillEditor/index.vue';
import { updDetailsInfo, ghTripDetail } from '../../../api/travelGh';

const size = ref('default')
const dialog = ref(false)
const loading = ref(false)
const labelPosition = ref('right')

// 根据富文本实时变化，观察有没有删除已经上传的id
function onContentChange(content) {
  ruleForm.description = content;
  console.log('content', content)
}


interface RuleForm {
  detailId:string;
  dayId: string;
  title: string;
  money: number; // 这里假设金额是一个数字，如果是字符串可以调整为 string
  traffic: string;
  startCity: string;
  endCity: string;
  startTime: string; // 这里可能需要根据具体需求调整日期时间的格式
  endTime: string;   // 同上，根据需要调整格式
  description: string;
  position: string;
  creatType: string;
  imgList: [];
  dayTab: string;
}



const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  detailId:'',
  dayId: '', // 请根据实际情况提供 dayId 的值
  title: '',
  money: 0, // 将 money 的类型调整为 number
  traffic: '',
  startCity: '',
  endCity: '',
  startTime: '', // 请根据实际情况提供时间字符串
  endTime: '',
  description: '',
  position: '',
  creatType: '',
  imgList: [],
  dayTab: '',
})

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 60, message: '至少写点东西吧', trigger: 'blur' },
  ],
  startTime: [
    {
      required: true,
      message: '请请选择时间',
      trigger: 'change',
    },
  ],
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const props = defineProps(['id', 'name', 'type', 'dayTab','ghid']);
const { id, name, type, dayTab, ghid } = toRefs(props);
const initList = inject('initList');

// initList();
// console.log('===',ghid.value);
const openDrawer = async () => {
  console.log('Received ghid:', props.ghid);

  // 打开抽屉或执行其他操作
  dialog.value = true;
  // 使用 await 等待 detail 函数完成
  //修改回显
  const response = await ghTripDetail(ghid.value)
  console.log(response);
  // ruleForm.dayId = response.dayId;
  // ruleForm.creatType = response.creatType;
  // ruleForm.dayTab = response.dayTab;
  ruleForm.detailId = response.detailId;
  ruleForm.description = response.description;
  ruleForm.endCity = response.endCity;
  ruleForm.endTime = response.endTime;
  ruleForm.imgList = response.imgList;
  ruleForm.money = response.money;
  ruleForm.position = response.position;
  ruleForm.startCity = response.startCity;
  ruleForm.startTime = response.startTime;
  ruleForm.title = response.title;
  ruleForm.traffic = response.traffic;
}
defineExpose({
  openDrawer
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('sizeForm', ruleForm)
      ruleForm.dayId = id?.value;
      ruleForm.creatType = type?.value;
      ruleForm.dayTab = dayTab?.value;
      // 模拟表单提交的异步操作
      updDetailsInfo(ruleForm);
      loading.value = true
      setTimeout(() => {
        ElMessage.success('修改成功！！')
        resetForm();
        // 调用更新页面的方法
        drawerRef.value?.close()
        loading.value = false
        initList();
      }, 2000)
    } else {
      console.log('error submit!',  fields)
    }
  })
}
// 添加一个重置表单的函数
const resetForm = () => {
  ruleForm.dayId = '';
  ruleForm.title = '';
  ruleForm.money = 0;
  ruleForm.traffic = '';
  ruleForm.startCity = '';
  ruleForm.endCity = '';
  ruleForm.startTime = '';
  ruleForm.endTime = '';
  ruleForm.description = '';
  ruleForm.position = '';
  ruleForm.creatType = '';
  ruleForm.imgList = [];
  ruleForm.dayTab = '';
}
const cancelForm = (formEl: FormInstance | undefined) => {
  loading.value = false
  dialog.value = false
}
</script>

<style>
.el-button.is-circle {
  width: 50px;
  height: 50px;
  margin: auto;
}

.el-radio-group {
  margin-right: 12px;
}

.demo-drawer__footer {
  display: flex;
  justify-content: center;
  margin: 10px;
}
</style>
