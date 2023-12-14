<template>
    <div class="weather-main">
        <div class="weather-container">
            <div class="weather-overview">
                <p class="weather-text">麦德林</p>
            </div>
            <div class="weather-overview">
                <p class="weather-text weather-icon"><i class="wi wi-day-windy"></i></p>
            </div>
            <div class="weather-overview">
                <p class="weather-text">29º</p>
            </div>
        </div>
        <div class="weather-container">
            <div class="forecast-column">
                <p class="day-header">周日</p>
                <p class="forecast-icon"><i class="wi wi-day-sleet-storm"></i></p>
                <p class="forecast-temp">17º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周一</p>
                <p class="forecast-icon"><i class="wi wi-day-cloudy"></i></p>
                <p class="forecast-temp">22º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周二</p>
                <p class="forecast-icon"><i class="wi wi-day-sunny"></i></p>
                <p class="forecast-temp">25º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周三</p>
                <p class="forecast-icon"><i class="wi wi-day-sunny"></i></p>
                <p class="forecast-temp">27º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周四</p>
                <p class="forecast-icon"><i class="wi wi-day-showers"></i></p>
                <p class="forecast-temp">20º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周五</p>
                <p class="forecast-icon"><i class="wi wi-cloudy"></i></p>
                <p class="forecast-temp">20º</p>
            </div>
            <div class="forecast-column">
                <p class="day-header">周六</p>
                <p class="forecast-icon"><i class="wi wi-day-windy"></i></p>
                <p class="forecast-temp">25º</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
// 异步引入样式表
const importStyles = async () => {
    await import('../../assets/css/weather/weather-icons.min.css');
    await import('../../assets/css/weather/css.css');
};

// 在组件创建时引入样式
importStyles();

// 在组件销毁前清除样式
onBeforeUnmount(() => {
    // 清除动态添加的样式
    removeStyles();
});

// 清除样式的函数
const removeStyles = () => {
    // 通过标签名 'link' 找到所有的<link>元素
    const linkElements = document.getElementsByTagName('link');
    // 遍历并删除所有动态添加的样式表
    for (const linkElement of linkElements) {
        if (linkElement.rel === 'stylesheet') {
            linkElement.parentNode.removeChild(linkElement);
        }
    }
};
</script>

<style scoped>
.weather-main {
    font-family: 'Titillium Web', sans-serif;
    /* background: linear-gradient(#007288, #0092AA); */
    color: rgb(62, 4, 4);
    width: 100vw;
    /* height: 100vh; */
    overflow: hidden;
    margin: 0;
    padding: 0;
}

.weather-widget {
    width: 600px;
    background-color: rgba(255, 255, 255, 0.15);

    border-style: solid;
    border-radius: 2px;
    border-color: rgba(255, 255, 255, 0.15);
    border-width: 2px;
}

.weather-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.weather-overview {
    flex-grow: 1;
    height: 100px;
    width: 200px;

    position: relative;
}

.weather-text {
    font-size: 200%;

    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.weather-icon {
    font-size: 350%;
    /* transform: translate(-50%, -90%); */
}

.forecast-column {
    width: 85px;
    flex-grow: 1;

    border-style: solid;
    border-color: rgba(255, 255, 255, 0.25);
    border-top-width: 2px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    border-right-width: 2px;
}

.forecast-column:last-of-type {
    border-right-width: 0px;
}

.forecast-column>p {
    text-align: center;
}

.day-header {
    background-color: rgba(255, 255, 255, 0.15);
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 600;
    margin: 0;
}

.forecast-icon {
    font-size: 150%;
    margin-bottom: 0px;
}

.forecast-temp {
    font-size: 125%;
}
</style>