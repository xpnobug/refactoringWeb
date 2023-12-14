<template>
  <section class="destinations" id="destinations">
    <div class="container">
      <!-- 标题 -->
      <h2 class="section-title">热门目的地
        <!-- <el-cascader :options="options" :show-all-levels="false" @change="handleCascaderChange" /> -->
      </h2>
      <!-- 卡片 -->
      <div class="swiper swiper1">
        <el-empty class="empty-state" v-if="cityList.length === 0" description="暂无数据" />
        <div class="destinations-cards swiper-wrapper">
          <!-- 卡片 1 -->
          <!-- 判断城市列表是否为空，如果为空显示空状态组件 -->
          <div class="destination-card swiper-slide" style="width: 221.333px; margin-right: 10px;"
            v-for="(item, index) in cityList" @click="handleToNear(item.id, item.cityName)">
            <img alt="" height="181" :src="item.cityImg" width="203" />
            <h5>{{ item.cityName }}</h5>
            <!-- <h6>{{ item.country }}</h6> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { selectAll, listByParentId } from '../api/city.js';
import { dicList } from '../api/citydic.js';
const cityList = ref([]);
const options = ref([]);

// const handleCascaderChange = (value, selectedOptions) => {
//   console.log('Selected cityId:', value);
//   listByParentId(value[1]).then(ref => {
//     cityList.value = ref.data;
//     console.log("ref", ref);

//   });
// };

const router = useRouter()
const handleToNear = (id: string, cityName: string) => {
  // 跳转到路由
  router.push({ path: '/near', query: { parent: id, cityName: cityName } }).then(() => {
    // 在路由跳转完成后刷新页面
    window.location.reload();
  });
};

onMounted(async () => {
  try {
    const type = "cityList";
    const response = await selectAll(type);
    cityList.value = response;
    console.log(response);

    // const dic = await dicList();
    // options.value = dic.data;
    // console.log(dic);
    // console.log($router);
  } catch (error) {
    console.error('数据获取失败:', error);
  }
});
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  /* 调整合适的高度 */
}
</style>