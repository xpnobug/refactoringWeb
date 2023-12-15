<template>
    <div class="zIndex">
        <div style="margin-bottom: 15px">
            <el-radio v-model="direction" label="horizontal">horizontal</el-radio>
            <el-radio v-model="direction" label="vertical">vertical</el-radio>
        </div>
        <div style="margin-bottom: 15px">
            <el-slider v-model="fillRatio" />
        </div>
        <el-space fill wrap :fill-ratio="fillRatio" :direction="direction" style="width: 100%">
            <el-card v-for="i in dayList" :key="i.dayId" class="box-card" @click="handleToGh(i.dayId)">
                <template #header>
                    <div class="card-header">
                        <span>{{ i.dayTitle }}</span>
                        <el-button class="button" text></el-button>
                    </div>
                </template>
                <div class="text item">
                    {{ i.start }} ~ {{ i.end }}
                </div>
            </el-card>
        </el-space>
    </div>
</template>
  
<script lang="ts" setup>
import { selectAll } from '../api/travelGh';
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
const direction = ref('horizontal');
const fillRatio = ref(10);
const dayList = ref([]);

onMounted(async () => {
    const response = await selectAll();
    dayList.value = response.records.map(record => {
        const endTime = new Date(record.dayEndTime);
        const startTime = new Date(record.dayStartTime);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const start = formatDate(startTime);
        const end = formatDate(endTime);

        return { ...record, start, end };
    });

    console.log(dayList.value);

    // 检测屏幕宽度
    const screenWidth = window.innerWidth;

    // 如果屏幕宽度小于某个阈值（假设阈值为 600px），则设置为 vertical，fillRatio 为 85
    if (screenWidth < 600) {
        direction.value = 'vertical';
        fillRatio.value = 85;
    }
});
const router = useRouter()
const handleToGh = (dayId) => {
    // 执行你的逻辑操作，例如打印 dayId
    console.log(dayId);

    router.push({ name: 'timeLine', params: { id: dayId } });
};
</script>

<style scoped>
.zIndex{
  z-index: 1;
}
</style>