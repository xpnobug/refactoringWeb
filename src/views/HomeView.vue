<template>
    <!-- 页面头部 -->
    <Headers />
    
    <!-- 主要内容区域 -->
    <MainContent />
 
    
    <!-- 酒店和餐厅 -->
    <HotelRestaurants />
    
    <!-- 旅行贴士 -->
    <TravelTips />
    
    <!-- 活动 -->
    <Activities />
 
    
    <!-- 页脚 -->
    <Footers />
</template>

<script>
// import Headers from '../components/Header.vue';
import Headers from '../components/header/Header-two.vue';
import MainContent from '../components/MainContent.vue';
import HotelRestaurants from '../components/HotelRestaurants.vue';
import TravelTips from '../components/TravelTips.vue';
import Activities from '../components/Activities.vue';
import Footers from '../components/Footer.vue';
export default {
  components: {
    Headers,
    MainContent,
    HotelRestaurants,
    TravelTips,
    Activities,
    Footers,
  }
  ,mounted() {
        const headerTwoScript = document.createElement('script');
        headerTwoScript.src = '/src/assets/js/script.js'; // Adjust the path accordingly
        document.head.appendChild(headerTwoScript);
   },
};
</script>

<style>
/* 添加全局样式 */
 
</style>
