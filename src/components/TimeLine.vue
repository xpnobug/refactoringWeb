<template>
  <div class="body">
    <div class="body-main">
      <!-- 景点背景图--轮播 -->
      <el-carousel :interval="5000" arrow="always" style="margin: 0px 0px 10px 0px; opacity: 0.70;">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">
            <el-image style="width: 100%; height: 50%" src="http://8.140.45.252:9000/travel/9c32dc6da96644caac0d01ea724ff914_tplv-dy-lqenfix_nbhd-v2_1440_1920_q75.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=mhAqhRJrIuFFfc8Glh3F%2F20231210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231210T103729Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e66559565a0d6f6e95f60e54cbd3122441d5ad811736c4ebeef00d872195a505" />
          </h3>
        </el-carousel-item>
      </el-carousel>

      <!-- 景点标题 -->
      <div class="jd-content">
        <div class="jd-title" v-for="i in ghInfo" :key="i">
          <h2>{{ i.dayTitle }}</h2>
          <!-- 描述 -->
          <p>{{ i.dayDesc }}</p>
        </div>
        <div class="jd-date">
          <el-tabs v-model="activeTab" type="card" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabs " :key="tab.label">
              <template>
                <div>
                  <h2>{{ tab.label }}</h2>
                  <!-- <p>{{ tab.djdate }}</p> -->
                </div>
              </template>
              <!-- 日期 ： 天数  -->
              <div class="jd-date-day">
                <h3>第{{ tab.dayCount }}天 {{ tab.djdate }} {{ tab.dayOfWeek }}</h3>
                <!-- 天气；注意事项；弹窗格式 -->
                <el-row class="mb-4">
                  <el-button type="success" round @click="dialogTableVisible = true">
                    天气预报
                  </el-button>
                  <!-- <el-button type="success" round>Success</el-button> -->
                  <!-- <el-button type="danger" round>注意事项</el-button> -->
                </el-row>
                <el-dialog :show-close="false" style="border-radius: 20px;" :width="350"
                           v-model="dialogTableVisible" title="☀天气预报">
                  <div class="scrollable-container">
                    <div class="scrollable-content">
                      <!-- 这里放置你的文本内容 -->
                      <WeatherForecast />
                    </div>
                  </div>

                </el-dialog>
              </div>
            </el-tab-pane>
            <!-- tab切换数据  根据选中的标签显示内容-->
            <!-- 时间轴：展示时间，车票信息位置，每个时间段可评论 -->
            <div class="jd-timeline">
              <el-empty :image-size="200" v-if="data.length === 0" description="暂无数据" />
              <div v-for="(v, i) in data" class="year-item">
                <the-time-line :time-data="v">
                  <template v-slot="soltData">
                    <!--这里采用作用域插槽-可以自己自定义卡片样式-->
                    <component :is="getComponentType(soltData.card)" :card-data="soltData.card" />
                    <div class="footer" style="margin: 10px 0px; top: 7px;">
                      <div class="position" v-if="soltData.card.position != ''">
                        <el-icon>
                          <Position />
                        </el-icon>
                        {{ soltData.card.position }}
                      </div>
                    </div>
                  </template>
                </the-time-line>
              </div>
              <el-affix position="bottom" :offset="120" transition="abc" class="affix-button">
                <el-popover :popper-style="{
                                    right: '20px',
                                    height: '450px',
                                    'min-width': '100px',
                                    background: 'rgba(255, 255, 255, 0)',
                                    border: '0',
                                    'box-shadow': 'none',
                                }" placement="top-start" :width="0" trigger="click" :show-arrow="false">
                  <template #reference>
                    <el-button style="font-size: 40px;
                                                    width: 50px;
                                                    height: 50px;
                                                    color: #409eff;
                                                    border-radius: 50%;
                                                    background-color: #fdfafa;
                                                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                                    border: none;
                                                    float: right;">
                      +
                    </el-button>
                  </template>
                  <el-row class="button-row">
                    <!-- 1.交通 2.餐饮 3.酒店 4.景点 5.自定义 -->
                    <JingDian :id="route.params.id" name="餐厅" type="2" :day-tab="currentTab" />
                    <el-button type="success" circle> 酒店 </el-button>
                    <el-button type="info" circle> 交通 </el-button>
                    <el-button type="warning" circle> 景点 </el-button>
                    <el-button type="danger" circle> 自定义 </el-button>
                    <el-button type="danger" circle @click="toggleTheme()"> 切换 </el-button>
                  </el-row>
                </el-popover>
              </el-affix>
            </div>
          </el-tabs>
        </div>
        <!-- <el-row class="mb-4">
            <el-button type="primary" plain>Primary</el-button>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { detail, tripAll } from '../api/travelGh';
import ImgCard from './timeline/ImgCard.vue';
import JingDian from './timeline/timeopen/jingdian.vue';
import TheTimeLine from '../components/timeline/TheTimeLine.vue';
import card from '../components/timeline/card.vue';
import WeatherForecast from '../components/weather/WeatherForecast.vue';
import { ref, onMounted, provide } from 'vue'
import { useRoute, useRouter } from "vue-router";
// const props = defineProps(['reloadParent']);
// defineExpose({ reloadParent });

// 富文本组件随时更新已经上传的富文本id
function getFileId(id) {
  uploadedRichTextIds.value.push(id)
  console.log('uploadedRichTextIds', uploadedRichTextIds.value);
}


const toggleTheme = () => {
  var elements = document.getElementsByClassName('inset-0');
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    // 遍历获取到的元素并为其添加样式
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      // 添加样式
      element.style.inset = '';
      // 在这里可以继续添加其他样式
    }
  }
  else {
    document.body.classList.add("dark");
    // 遍历获取到的元素并为其添加样式
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      // 添加样式
      element.style.inset = '0px';
      // 在这里可以继续添加其他样式
    }
  }
}
// 弹出层
const dialogTableVisible = ref(false)

const activeTab = ref("D1");
const currentTab = ref('D1'); // 默认选中第一个标签
const dayList = ref([]);
const tabs = ref([]);

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {

    const response = await detail(route.params.id);
    // 如果 response 不是数组，将其转为数组
    dayList.value = Array.isArray(response) ? response : [response];
    ghInfo.value = dayList.value;
    tabs.value = dayList.value.map((day, index) => {
      // console.log(day);
      // 将字符串日期转换为 JavaScript Date 对象
      const start = new Date(day.dayStartTime);
      const end = new Date(day.dayEndTime);
      const dateList = [];
      const dayOfWeekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const currentDate = new Date(start);

      let dayCount = 1; // 记录是第几天
      while (currentDate <= end) {
        dateList.push({
          date: new Date(currentDate),
          dayOfWeek: dayOfWeekList[currentDate.getDay()],
          dayCount: numberToChinese(dayCount++),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      function numberToChinese(num) {
        const chineseNumberList = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        const unitPosition = ['', '十', '百', '千', '万'];

        if (num <= 0) {
          return '不支持的数字范围';
        } else if (num <= 10) {
          return chineseNumberList[num - 1];
        } else {
          const numStr = num.toString();
          const len = numStr.length;
          let result = '';

          for (let i = 0; i < len; i++) {
            const digit = parseInt(numStr[i]);

            if (digit !== 0) {
              result += chineseNumberList[digit - 1] + unitPosition[len - i - 1];
            } else {
              if (result !== '' && result[result.length - 1] !== '零') {
                result += '零';
              }
            }
          }

          return result.replace(/零+$/, '');
        }
      }
      // 输出每天的日期和星期几
      // dateList.forEach(day => {
      //     console.log(`第${day.dayCount}天 -, ${day.dayOfWeek}`);
      // });

      // 计算两个日期之间的天数差
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      // 生成标签数组，例如 ['D1', 'D2', 'D3']
      const labels = Array.from({ length: daysDiff }, (_, i) => `D${i + 1}`);

      const dates = Array.from({ length: daysDiff }, (_, i) => {
        const currentDate = new Date(start);
        currentDate.setDate(currentDate.getDate() + i);
        return `${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
      });

      // 使用 flatMap 将每一天的标签和日期映射成一个对象数组
      return labels.flatMap((label, i) => ({
        label: label,
        name: `D${i + 1}`, // 可以根据需要设置唯一的name
        djdate: dates[i],
        dayCount: dateList[i].dayCount,
        dayOfWeek: dateList[i].dayOfWeek,
      }));
    });
    tabs.value = tabs.value[0];
    // console.log(tabs.value)
  } catch (error) {
    console.error('数据获取失败:', error);
  }
});


const data = ref([]);
// 格式化时间字符串
function formatTime(timeString) {
  if (!timeString || typeof timeString !== 'string') {
    return timeString;
  }
  // 将时间字符串拆分为小时、分钟和秒
  const [hours, minutes, seconds] = timeString.split(':').map(part => parseInt(part));
  // 格式化小时、分钟和秒，确保两位数
  const formattedHours = hours !== undefined ? hours.toString().padStart(2, '0') : '';
  const formattedMinutes = minutes !== undefined ? minutes.toString().padStart(2, '0') : '';
  const formattedSeconds = seconds !== undefined && seconds !== 0 ? `:${seconds.toString().padStart(2, '0')}` : '';
  return `${formattedHours}:${formattedMinutes}${formattedSeconds}`;
}

const formatDates = (dates) =>
    dates.map(date => ({
      ...date,
      startTime: formatTime(date.startTime),
      endTime: formatTime(date.endTime)
    }));

// 初始化列表数据
const initList = async () => {
  // 调用异步函数获取数据
  const dataList = await tripAll(currentTab.value);
  // 将数据保存到响应式变量中
  data.value = dataList.map(mouthData => ({
    ...mouthData,
    mouthData: mouthData.mouthData.map(dateArr => ({
      ...dateArr,
      dateArr: formatDates(dateArr.dateArr)
    }))
  }));
};

initList();
//规划详情数据
const ghInfo = ref([]);
provide('initList', initList);

const handleClick = (tab, event) => {
  currentTab.value = tab.props.name; // 更新 currentTab
  initList();
}

//1.交通 2.餐饮 3.酒店 4.景点 5.自定义
const getComponentType = (cards) => {
  // if (cards.creatType == '1') {
  //     return card;
  // } else if (cards.creatType == '2') {
  //     return ImgCard;
  // }
  switch (cards.creatType) {
    case '1':
      return card;
    case '2':
      return ImgCard;  // 替换成实际的组件名称
    case '3':
      return ImgCard;  // 替换成实际的组件名称
    case '4':
      return ImgCard;  // 替换成实际的组件名称
    case '5':
      return 'custom-card';  // 替换成实际的组件名称
    default:
      return 'default';
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.body {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}

.body-main {
  width: 1000px;
}

.body-main .jd-content {
  margin: 20px;
}

.body-main .jd-title {
  opacity: 0.70;
  margin: 10px 35px;
  color: #409EFF;
  font-size: 24px;
}
.body-main .jd-title p {
  /* color: #409EFF; */
  font-size: 16px;
}
.body-main .jd-date {
  margin-top: 20px;
}

.jd-date .jd-date-day {
  /* margin-top: 60px; */
  margin-bottom: 20px;
  text-align: center;
}

.mb-4 {
  margin-top: 20px;
  justify-content: center;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 标签 */
:deep(.demo-tabs>.el-tabs__content) {
  color: #6b778c;
  top: 40px;
}

.scrollable-container {
  overflow-x: auto;
  /* 启用水平滚动条 */
  white-space: nowrap;
  /* 防止文本换行 */
  max-width: 100%;
  /* 限制最大宽度 */
}

.scrollable-content {
  display: inline-block;
  /* 让内容水平排列，而不是换行 */
  padding: 10px;
  /* 可根据需要调整内边距 */
}

/* 隐藏水平滚动条 */
.scrollable-container::-webkit-scrollbar {
  height: 0;
  background: transparent;
  /* 设置背景色为透明 */
}

/* 可以添加滚动条样式 */
.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  /* 滚动条的颜色 */
}


:deep(.el-tabs__item.is-top) {
  background-color: #818bb8a2;
  /* 浅蓝色背景 */
  border-radius: 10px;
  /* 边框半圆 */
  margin: 10px;
  /* 间隔10px */
  color: white;
  text-align: center;
  height: 60px;
  width: 50px;
}

:deep(.el-tabs__item.is-active) {
  color: #ffffff;
  background-color: #062af5a2;
}

:deep(.el-tabs--card > .el-tabs__header) {
  border: none;
  /* 去掉边框 */
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border: none;
  /* 去掉每个标签项的边框 */
  border-bottom: none;
  /* 去掉每个标签项的下划线 */
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: none;
  /* 去掉边框 */
}

.custom-left-content,
.custom-right-content {
  width: 50px;
  /* 调整左右两侧内容宽度 */
  text-align: center;
  font-weight: bold;
}

.custom-right-content {
  float: right;
  /* 将右侧内容浮动到右边 */
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


.abc-enter-active,
.abc-leave-active {
  transition: all .5s;
}

.abc-enter,
.abc-leave-to {
  opacity: 0;
  transform: translate(-50px, -50px) scale(0.5);
}

.affix-button {
  position: fixed;
  bottom: 120px;
  right: 45px;
  z-index: 1000;
}

.button-row {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* align-content: space-around; */
}

.el-button.is-circle {
  width: 50px;
  height: 50px;
  margin: auto;
}

/* 竖屏 */
@media screen and (orientation: portrait) and (max-width: 720px) {

  /* 使用 /deep/ 或 >>> 选择器穿透 scoped 样式 */
  :deep(.el-tabs__nav-scroll) {
    width: 350px;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
  }

  :deep(.el-tabs__nav-prev) {
    display: none;
  }

  :deep(.el-tabs__nav-next) {
    display: none;
  }
}

/* 横屏 */
@media screen and (orientation: landscape) {
  :deep(.el-tabs__nav-scroll) {
    /* overflow-x: auto; */
    white-space: nowrap;
    max-width: 100%;
  }

  :deep(.el-tabs__nav-prev) {
    position: absolute;
    cursor: pointer;
    line-height: 80px;
    font-size: 24px;
    color: var(--el-text-color-secondary);
    width: 20px;
    text-align: center;
  }

  :deep(.el-tabs__nav-next) {
    position: absolute;
    cursor: pointer;
    line-height: 80px;
    font-size: 24px;
    color: var(--el-text-color-secondary);
    width: 20px;
    text-align: center;
  }
}
</style>