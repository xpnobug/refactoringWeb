<template>
  <el-button type="info" @click="openDrawer" circle> {{ name }}</el-button>
  <el-drawer ref="drawerRef" :close-on-click-modal="false" v-model="dialog" :title="name" direction="ltr" class="demo-drawer" size="100%">
    <div class="demo-drawer__content">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" :label-position="labelPosition"
               :size="size" status-icon>
        <el-form-item required>
          <el-col :span="11">
            <el-form-item label="" prop="title">
              <el-input v-model="ruleForm.title" placeholder="请输入标题名称"/>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="traffic">
              <el-select
                  v-model="ruleForm.traffic"
                  placeholder="请选择交通方式"
                  clearable
                  @change.prevent="handleSelectChange"
              >
                <el-option label="汽车/自驾" value="car"/>
                <el-option label="公交/地铁" value="gj"/>
                <el-option label="火车/高铁" value="hcgt"/>
                <el-option label="飞机" value="fj"/>
                <el-option label="单车/电瓶车" value="dc"/>
                <el-option label="轮船" value="lc"/>
                <el-option label="步行" value="citywork"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item v-if="showStartEnd" label="" prop="startPoint">
              <el-input v-model="ruleForm.startCity" placeholder="请输入起始站点"/>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item v-if="showStartEnd" label="" prop="endPoint">
              <el-input v-model="ruleForm.endCity" placeholder="请输入到达站点"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item label="" prop="startTime">
              <el-time-picker v-model="ruleForm.startTime" label="Pick a time" placeholder="请输入发生时间"
                              style="width: 100%" value-format="HH:mm"/>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item v-if="showStartEnd" label="" prop="startPoint">
              <el-time-picker v-model="ruleForm.endTime" label="Pick a time" placeholder="请输入到达时间"
                              style="width: 100%" value-format="HH:mm"/>
            </el-form-item>
          </el-col>
        </el-form-item>


        <el-form-item prop="description">
          <QuillEditor @handleRichTextContentChange="onContentChange"/>
          <!-- <el-input v-model="ruleForm.description" placeholder="请输入描述" type="textarea" :rows="4" /> -->
        </el-form-item>
        <Upload v-model:modelValue="ruleForm.imgList"/>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {inject, reactive, ref, toRefs, computed } from 'vue'
import {ElDrawer, ElMessage, FormInstance, FormRules} from 'element-plus'
import Upload from './uploadFile.vue';
import QuillEditor from '../../QuillEditor/index.vue';
import {addDetailsInfo} from '../../../api/travelGh';

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
    {required: true, message: '请输入标题', trigger: 'blur'},
    {min: 1, max: 60, message: '至少写点东西吧', trigger: 'blur'},
  ],
  startTime: [
    {
      required: true,
      message: '请请选择时间',
      trigger: 'change',
    },
  ],
  traffic: [
    {
      required: true,
      message: '请选择交通方式',
      trigger: 'change',
    }
  ]
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const openDrawer = () => {
  dialog.value = true
}

const props = defineProps(['id', 'name', 'type', 'dayTab']);
const {id, name, type, dayTab} = toRefs(props);
const initList = inject('initList');

console.log('dayId', dayTab?.value)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log('sizeForm', ruleForm)
      ruleForm.dayId = id?.value;
      ruleForm.creatType = type?.value;
      ruleForm.dayTab = dayTab?.value;
      // 模拟表单提交的异步操作
      const dataList = addDetailsInfo(ruleForm);
      loading.value = true
      setTimeout(() => {
        ElMessage.success('添加成功！！')
        // 重置表单数据
        resetForm();
        // 调用更新页面的方法
        drawerRef.value?.close()
        loading.value = false
        initList();
      }, 2000)
    } else {
      console.log('error submit!', fields)
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

const handleSelectChange = (val) => {
  // 更新你的数据模型
  ruleForm.traffic = val;
  // 阻止抽屉关闭
  dialog.value = true
};
// 计算属性来判断是否显示起始站点和到达站点的输入框
const showStartEnd = computed(() => {
  return ruleForm.traffic !== 'dc' &&
      ruleForm.traffic !== 'citywork' &&
      ruleForm.traffic !== '';
});

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
