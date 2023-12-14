<template>
    <div class="timeline-main">
        <!--年月标题-->
        <div class="timeline-title">
            <!-- {{ timeData.yearData }} -->
            <i :class="showCards ? 'el-icon-arrow-down' : 'el-icon-arrow-right'" @click="showCards = !showCards"></i>
        </div>
        <ul class="timeline-body">
            <!--时间线顶部圆点-->
            <li class="timeline-item-head">
                <div class="item-node"></div>
                <div class="item-tail"></div>
            </li>
            <!--时间线内容-->
            <template v-if="showCards">
                <li v-for="(mouthItem, i) in timeData.mouthData" :key="'mm' + i" class="timeline-item">
                    <!--  v-for="(date, j) in mouthItem.dateArr" :key="'date' + j" -->
                    <div class="item-left" v-for="(date, j) in mouthItem.dateArr" :key="'date' + j">
                        <div class="item-left-data">{{ date.startTime }}</div>
                        <div class="item-left-total">
                            <div class="item-left-total-text">
                                共{{ mouthItem.dateArr.length }}条
                            </div>
                            <div class="item-left-total-end"></div>
                        </div>
                    </div>
                    <div class="item-tail"></div>
                    <div class="item-node"></div>
                    <div class="item-content">
                        <slot v-for="v in mouthItem.dateArr" :card="v"></slot>
                    </div>
                </li>
            </template>
            <!--时间线尾部圆点-->
            <li class="timeline-item-foot">
                <div class="item-node"></div>
                <div class="item-tail"></div>
            </li>
        </ul>
    </div>
</template>
   
<script setup>
import { ref } from 'vue';
// 通过 defineProps 获取 props
const { timeData } = defineProps(['timeData']);
// const dateList = ref([])
// dateList.value = timeData.mouthData;
// console.log(timeData.mouthData);

// 使用 ref 创建响应式变量
const showCards = ref(true);

// 不再需要声明组件的名字、props、data() 等，这些都是隐式处理的
</script>
 
   
<style scoped>
/* .timeline-main {
    padding: 0 0 0 20px;
} */

.timeline-main .timeline-title {
    margin-bottom: 10px;
    font-weight: bold;
}

.timeline-main .timeline-title i {
    cursor: pointer;
}

.timeline-main .timeline-body {
    margin: 0;
    font-size: 14px;
    list-style: none;
    padding-left: 10px;
}

.timeline-main .timeline-body .timeline-item-head,
.timeline-main .timeline-body .timeline-item-foot {
    position: relative;
    height: 15px;
}

.timeline-main .timeline-body .timeline-item-head .item-tail,
.timeline-main .timeline-body .timeline-item-foot .item-tail {
    position: absolute;
    left: 45px;
    height: 100%;
    border-left: 2px solid #e4e7ed;
}

.timeline-main .timeline-body .timeline-item-head .item-node,
.timeline-main .timeline-body .timeline-item-foot .item-node {
    position: absolute;
    left: 42px;
    width: 8px;
    height: 8px;
    background-color: #e4e7ed;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.timeline-main .timeline-body .timeline-item-foot .item-node {
    top: 14px;
}

.timeline-main .timeline-body .timeline-item {
    position: relative;
    padding-bottom: 10px;
}

.timeline-main .timeline-body .timeline-item .item-left {
    position: absolute;
    top: 13px;
    left: -9px;
}

.timeline-main .timeline-body .timeline-item .item-left .item-left-data {
    font-weight: bold;
    line-height: 20px;
}

.timeline-main .timeline-body .timeline-item .item-left .item-left-total {
    display: flex;
    font-size: 12px;
}

.timeline-main .timeline-body .timeline-item .item-left .item-left-total .item-left-total-text {
    padding: 0 3px;
    line-height: 20px;
    color: #ffffff;
    background: #409EFF;
}

.timeline-main .timeline-body .timeline-item .item-left .item-left-total .item-left-total-end {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 6px solid #409eff;
    border-bottom: 10px solid transparent;
}

.timeline-main .timeline-body .timeline-item .item-tail {
    position: absolute;
    left: 45px;
    height: 100%;
    border-left: 2px solid #e4e7ed;
}

.timeline-main .timeline-body .timeline-item .item-node {
    position: absolute;
    top: 38px;
    left: 41px;
    width: 6px;
    height: 6px;
    background-color: #ffffff;
    border: 2px solid #409EFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.timeline-main .timeline-body .timeline-item .item-content {
    position: relative;
    padding-top: 30px;
    padding-left: 60px;
}
</style>