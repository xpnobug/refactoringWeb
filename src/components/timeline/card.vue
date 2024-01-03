<template>
    <div class="card-title">
        <div class="card-content">
            <span>{{ cardData.title }} <el-button type="warning" plain>￥ {{ cardData.money }}</el-button>
            </span>

        </div>
        <div class="card-desc">
            <span v-html=cardData.description> </span>
        </div>
    </div>
    <div class="item-content-card">
        <div class="time-content" :class="statusStyle(cardData.status)">
            <!-- <div class="time-content-no">
                <div class="time-content-no-circle" :class="{ 'time-content-delete': cardData.type != 1 }"></div>
                {{ cardData.title }} -- {{ cardData.trainNumber }}
            </div> -->
            <div class="time-content-name">
                <div class="time-content-left">
                    <p class="time-content-time">{{cardData.startTime}}</p>
                    <p class="time-content-utilname">{{cardData.startCity}}</p>
                </div>
                <div class="time-content-jt">
                    <p class="jt">===></p>
                </div>
                <div class="time-content-right">
                    <p class="time-content-time">{{cardData.endTime}}</p>
                    <p class="time-content-utilname">{{cardData.endCity}}</p>
                </div>
                <!-- <div v-if="showRevoke()" class="opera-icon-back" title="撤销" @click.stop="revokeWorkFlow"></div>
                <div v-if="showRevoke() && cardData.status == 4" class="opera-icon-edit" title="编辑"
                    @click.stop="editWorkFlow"></div> -->
                <!-- <div class="item-status"><b>{{ formatStatus(cardData.status) }}</b></div> -->
                <!-- <div class="item-status"><b>￥{{ cardData.money }}</b></div> -->
            </div>
        </div>
        <div class="time-title">
            <span class="time-tag">历时1小时</span>
            <span class="time-tag">历时1小时</span>
            <span class="time-tag">历时1小时</span>
        </div>
    </div>
</template>
<script setup>
// 导入 ref 用于响应式数据
import { ref } from 'vue';

// 通过 defineProps 获取 props
const { cardData } = defineProps(['cardData']);

// 跳转详情页面
const goDetail = () => {
    // 这里的 $router 需要通过传入的 setupContext 获取
    setupContext.emit('goDetail'); // 触发事件或其他处理方式
};

// 显示撤销
const showRevoke = () => {
    // 判断符合条件的逻辑
};

// 撤销
const revokeWorkFlow = () => {
    // 撤销的逻辑
};

// 编辑被驳回
const editWorkFlow = () => {
    // 编辑被驳回的逻辑
};

// 1.交通 2.餐饮 3.酒店 4.景点 5.自定义
const statusStyle = (v) => {
    if (String(v) === '2') {
        return 'time-status-unreview';
    } else if (String(v) === '3') {
        return 'time-status-success';
    } else if (String(v) === '4' || String(v) === '5') {
        return 'time-status-back';
    } else {
        return 'time-status-unreview';
    }
};

// 格式化状态
const formatStatus = (v) => {
    if (String(v) === '2') {
        return '待审核';
    } else if (String(v) === '3') {
        return '通过';
    } else if (String(v) === '4') {
        return '驳回';
    } else if (String(v) === '5') {
        return '撤销';
    } else {
        return '--';
    }
};
</script>

   
<style scoped>
.item-content-card {
    cursor: pointer;
    border-radius: 4px;
    background-color: #f7f9fa;
    margin-bottom: 10px;
}

.item-content-card .time-title {
    position: relative;
    box-sizing: border-box;
    height: 50px;
    padding: 15px;
    border-bottom: 1px solid #e4e4e4;
}

.item-content-card .time-title i {
    font-size: 16px;
}

/* .item-content-card .time-title .item-status {
    position: absolute;
    font-size: 12px;
    top: 13px;
    right: 0;
    width: 40px;
    text-align: center;
    z-index: 1;
    transform: rotate(45deg);
}

.item-content-card .time-title:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-style: solid;
    border-width: 25px 25px 25px 25px;
    width: 0px;
    height: 0px;
} */

.item-content-card .time-status-unreview .item-status {
    color: #409EFF;
}

.item-content-card .time-status-unreview:after {
    border-color: #d3e7fb #d3e7fb transparent transparent;
}

.item-content-card .time-status-success .item-status {
    color: #67C23A;
}

.item-content-card .time-status-success:after {
    border-color: #dbeed4 #dbeed4 transparent transparent;
}

.item-content-card .time-status-back .item-status {
    color: #E6A23C;
}

.item-content-card .time-status-back:after {
    border-color: #f4e7d4 #f4e7d4 transparent transparent;
}

/* .item-content-card .time-content {
    padding: 15px;
} */

.item-content-card .time-content .item-status {
    position: absolute;
    font-size: 12px;
    top: 95px;
    right: 0;
    width: 40px;
    text-align: center;
    z-index: 1;
    transform: rotate(45deg);
}

/* .item-content-card .time-content:after {
    content: "";
    position: absolute;
    top: 88px;
    right: 0;
    border-style: solid;
    border-width: 25px 25px 25px 25px;
    width: 0px;
    height: 0px;
} */


.item-content-card .time-content .time-content-no .time-content-no-circle {
    width: 10px;
    height: 10px;
    display: inline-block;
    background-color: #8ec850;
    border-radius: 50%;
    margin-right: 6px;
}

.item-content-card .time-content .time-content-no .time-content-delete {
    background-color: #666666;
}

.item-content-card .time-content .time-content-name {
    display: flex;
    line-height: 20px;
    padding-left: 20px;
    justify-content: space-evenly;
}

.item-content-card .time-content .time-content-name span {
    margin-right: 20px;
}

.item-content-card .time-content .time-content-name .opera-icon-back {
    margin-left: 30px;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url('../images/rollback.png') no-repeat;
    background-size: 18px;
}

.item-content-card .time-content .time-content-name .opera-icon-back:hover {
    background: url('../images/rollback_h.png') no-repeat;
    background-size: 18px;
}

.item-content-card .time-content .time-content-name .opera-icon-edit {
    margin-left: 5px;
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url('../images/edit.png') no-repeat;
    background-size: 18px;
}

.item-content-card .time-content .time-content-name .opera-icon-edit:hover {
    background: url('../images/edit_h.png') no-repeat;
    background-size: 18px;
}

.item-content-card:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.17647059);
}

.card-title .card-content {
    color: #409EFF;
    font-size: 20px;
    font-weight: 600;
}

.card-title .card-desc {
    font-size: 15px;
    font-weight: 500;
    margin: 5px 0px;
    line-height: 2;
}

.time-content-left .time-content-time {
    font-size: 20px;
    line-height: 2;
}

.time-content-right .time-content-time {
    font-size: 20px;
    line-height: 2;
}

p.jt {
    line-height: 4;
}

.time-title {
    display: flex;
    justify-content: space-evenly;
}

.time-title .time-tag {
    background-color: rgba(128, 128, 128, 0.5);
    border: none;
    border-radius: 7px;
    padding: 0px 10px;
    color: rgb(94 94 94);
}
</style>