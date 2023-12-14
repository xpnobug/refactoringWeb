<template>
    <Headers />
    <!-- 热门目的地 -->
<section class="hotel-restaurants" id="restaurants">
  <div class="container">
    <div class="title-container">
      <h2 class="section-title">附近热门景点 - {{ data.query.cityName }}
        <router-link to="/"><el-button color="#626aef" type="primary" :icon="ArrowLeft">返回 </el-button></router-link></h2>
    </div>
    <el-empty class="empty-state" v-if="jdList.length === 0" description="暂无数据"/>
    <div class="hotel-card">
    <!-- 卡片 -->
    <div class="card" v-for="(item,index) in jdList">
      <div class="poster"><img :src= "item.cityImg" alt="Location Unknown"></div>
      <div class="details">
        <h1>{{ item.cityName }} </h1>
        <h2>参观时间 {{ item.visitTime }}</h2>
        <div class="rating">
          <!-- <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}" /> -->
        </div>
        <div class="tags">
          <!-- <span class="tag">Italian</span> -->
          <span>门票：<i class="fonts">{{ item.admissionFee == 0 ? "免费" : item.admissionFee }}</i> </span>
        </div>
        <p class="desc">
          {{ item.description }}
        </p>
        <div class="cast">
          <h3>地理位置:  {{ item.position }}</h3>
          <el-button color="#626aef" plain>路线规划</el-button>
          <el-button color="#626aef" plain  @click="handleToGh(item.id,item.cityName)">旅行攻略</el-button>
          <el-button color="#626aef" plain>附近酒店</el-button>
          <!-- <ul>
            <li><img src="https://i.postimg.cc/jqgkqhSb/cast-11.jpg" alt="Marco Andrews" title="Marco Andrews"></li>
            <li><img src="https://i.postimg.cc/8P7X7r7r/cast-12.jpg" alt="Rebecca Floyd" title="Rebecca Floyd"></li>
            <li><img src="https://i.postimg.cc/2SvHwRFk/cast-13.jpg
" alt="Antonio Herrera" title="Antonio Herrera"></li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
    <!-- 页脚 -->
    <Footers />
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import Headers from '../components/Header.vue';
import Footers from '../components/Footer.vue';
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { listByNearCity } from '../api/city.js';
const value = ref(5)
const jdList = ref([]);
const route=useRoute()
let data=reactive({
    query: route.query
})
console.log(data);
const router=useRouter()
const handleToGh = (id: string, cityName: string) => {
  // 跳转到路由
  router.push({ path: '/gh', query: { parent: id, cityName: cityName } }).then(() => {
    // 在路由跳转完成后刷新页面
    // window.location.reload();
  });
};
const reloadFlag = ref(false);

// beforeRouteEnter-like hook
const beforeRouteEnter = (to, from, next) => {
  if (to.meta.reload) {
    reloadFlag.value = !reloadFlag.value;
  }
  next();
};


onMounted(async () => {
  try {
    const response = await listByNearCity(data.query.parent);
    jdList.value = response;
    console.log(jdList);
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
    height: 300px; /* 调整合适的高度 */
}
 
.card {
    position: relative;
    width: 320px;
    height: 320px;
    background: #000;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
}

.poster {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.poster::before {
    content: '';
    position: absolute;
    bottom: -45%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: .3s;
}

.card:hover .poster::before {
    bottom: 0;
}

.poster img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
    transition: .3s;
}

.card:hover .poster img {
    transform: scale(1.1);
}

.details {
    position: absolute;
    bottom: -205px;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1.5em 1.5em 2em;
    background: #000a;
    backdrop-filter: blur(16px) saturate(120%);
    transition: .3s;
    color: #fff;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.card:hover .details {
    bottom: 0;
}

.details h1,
.details h2 {
    font-weight: 700;
}

.details h1 {
    font-size: 1.5em;
    margin-bottom: 5px;
}

.details h2 {
    font-weight: 400;
    font-size: 1em;
    margin-bottom: 10px;
    opacity: .6;
}

.details .rating {
    position: relative;
    margin-bottom: 15px;
    display: flex;
    gap: .25em;
    /* justify-content: space-between; */
    align-items: center;
}

.details .rating i {
    color: #e3c414;
}

.details .rating span {
    margin-left: 0.25em;
}

.details .tags {
    display: flex;
    gap: .375em;
    margin-bottom: .875em;
    font-size: 1.25em;
}

.details .tags span {
    padding: .35rem .65rem;
    color: #fff;
    border: 1.5px solid rgba(255 255 255 / 0.4);
    border-radius: 4px;
    border-radius: 50px;
}

.details .desc {
    color: #fff;
    opacity: .8;
    line-height: 1.5;
    margin-bottom: 1em;
    overflow: hidden;             /*超出内容隐藏*/
    text-overflow: ellipsis;      /*超出内容为省略号*/
    display: -webkit-box;         /*内容不换行*/
    -webkit-line-clamp: 3;        /*超出几行*/
    -webkit-box-orient: vertical; /*从上到下垂直排列子元素*/
    height: 100%;
    text-indent: 2em;
 
}

.details .cast h3 {
    margin-bottom: 1.5em;
}

.details .cast ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    width: 100%;
}

.details .cast ul li {
    list-style: none;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    border: 1.5px solid #fff;
}

.details .cast ul li img {
    width: 100%;
    height: 100%;
}

.fonts{
  color: red;
  font-weight: bolder;

}
</style>