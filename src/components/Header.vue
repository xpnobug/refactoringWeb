<template>
    <Navs />
    
    <main class="main" id="home">
      <nav class="navbar" style="height: 60px;"></nav>
      <!-- 展示区域内容 -->
      <div class="showcase-content">
        <h1>发现最有趣的地方</h1>
        <a class="showcase-button" href="https://earth.google.com/web/" target="_blank">
          <img alt="" src="../assets/Imgs/icons/globe.png"/> 在地球上探索</a
        >
      </div>
  
      <!-- 展示区域搜索 -->
      <div class="showcase-search">
        <!-- 筛选器 -->
        <div class="filters">
          <!-- 位置筛选 -->
          <div class="filter">
            <div class="search-icon">
              <img alt="" src="../assets/Imgs/icons/location.png"/>
            </div>
            <div class="search-text">
              <h4>位置</h4>
              <h2>探索附近 </h2>
            </div>
          </div>
          <!-- 活动筛选 -->
          <div class="filter">
            <div class="search-icon">
              <img alt="" src="../assets/Imgs/icons/activities.png"/>
            </div>
            <div class="search-text">
              <h4>活动</h4>
              <h2>所有活动</h2>
            </div>
          </div>
          <!-- 时间筛选 -->
          <div class="filter">
            <div class="search-icon">
              <img alt="" src="../assets/Imgs/icons/calendar.png"/>
            </div>
            <div class="search-text">
              <h4>时间</h4>
              <h2>选择日期</h2>
            </div>
          </div>
          <!-- 客人筛选 -->
          <div class="filter">
            <div class="search-icon">
              <img alt="" src="../assets/Imgs/icons/guest.png"/>
            </div>
            <div class="search-text">
              <h4>客人</h4>
              <h2>1 位客人</h2>
            </div>
          </div>
        </div>
        <!-- 搜索按钮图标 -->
        <div class="search-button-icon">
          <img alt="" src="../assets/Imgs/icons/search.svg"/>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import Navs from './header/nav.vue';
 
  </script>
  
  <style scoped>
  
  </style>
    