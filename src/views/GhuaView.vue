<template>
  <Navs v-if="!isMobile" />
  <div class="body">
    <!-- partial:index.partial.html -->
    <header>
      <img src="https://cdn.xxhzm.cn/images/4k/acg/c7443220a5364bf48abb52dbb329a40f.jpg" alt="" class="backdrop" />
      <div class="header__cover"></div>
    </header>
    <div class="intro">
      <img src="https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640" alt="" class="avatar" />
      <div class="title-wrapper">
        <div class="title">
          <h1>Jhey ʕ •ᴥ•ʔ</h1>
          <a href="https://twitter.com/jh3yy" rel="noreferrer noopener" target="_blank">@jh3yy</a>
        </div>
      </div>
    </div>
    <main>
      <ul>
 
        <li class="skeleton">
          <div class="skeleton__block">
            <h1>asfjkasl;kf</h1>
          </div>
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
        </li>
        <li class="skeleton">
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
        </li>
        <li class="skeleton">
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
        </li>
        <li class="skeleton">
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
          <div class="skeleton__block"></div>
        </li>
      </ul>
    </main>
    <!-- partial -->
  </div>
</template>

<script setup>
// import Tjcard from '../components/Tjcard.vue';
import Navs from '../components/header/nav.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
// 异步引入样式表
const importStyles = async () => {
  await import('../assets/css/gh/normalize.css');
  await import('../assets/css/gh/normalize.min.css');
  await import('../assets/css/gh/open-props.min.css');
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
const isMobile = ref(false);
// 在组件挂载后执行
onMounted(() => {
  checkMobile();
  // 监听窗口大小变化，以便动态更新设备类型
  window.addEventListener('resize', checkMobile);

});

// 在组件销毁前移除窗口大小变化监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});

function checkMobile() {
  // 使用媒体查询检测是否为手机端
  isMobile.value = window.matchMedia('(max-width: 768px)').matches;
}
</script>

<style scoped>
.body {
  background: var(--gray-2);
  display: grid;
  min-height: 200vh;
  justify-items: center;
  /* overflow-x: hidden; */
  /* align-content: start; */
  /* overflow-y: auto; */
}

header {
  background: var(--surface-2);
  background-size: cover;
  max-width: 100%;
  width: var(--size-md);
  aspect-ratio: var(--aspect-ratio);
  height: var(--header-scroll);
  position: relative;
  width: 100vw;
  position: sticky;
  top: calc((var(--header-scroll) * -1) + var(--title-height));
}

.header__wrap {
  position: relative;
  view-timeline-name: --header;
}

.header__cover {
  position: absolute;
  inset: 0;
  background: hsl(0 0% 0% / 0.25);
  opacity: 0;
  backdrop-filter: blur(6px);
  animation: fade-in both linear;
  animation-timeline: scroll();
  animation-range: var(--cover-range);
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.backdrop {
  height: 100%;
  width: 100%;
  object-fit: cover;
  clip-path: inset(0 0 0 0);
}

.avatar {
  width: 15rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: var(--size-2) solid var(--gray-2);
  position: absolute;
  top: 0%;
  left: var(--size-4);
  transform: translate(0, -100%);
  transform-origin: 0% 50%;
  animation: scale-down both ease-out, look-down both steps(20);
  animation-timeline: scroll();
  /* 如果不需要动画时间轴，可以移除这行 */
  animation-range: var(--avatar-range);
  /* calc((var(--header-scroll) * 0.25) calc((var(--header-scroll) + (var(--title-height) * 2.2))); */
  z-index: 2;
  object-position: 0 0;
  object-fit: cover;
  background: linear-gradient(hsl(10 80% 50%), hsl(280 80% 50%));
}

@keyframes scale-down {
  to {
    transform: scale(0.35) translate(0, -50%);
  }
}

@keyframes look-down {
  to {
    object-position: 100% 0;
  }
}


.intro {
  max-width: 100vw;
  width: var(--size-md);
  position: sticky;
  top: 0;
  margin-top: calc(var(--size-12) * 0.5);
}

main {
  width: var(--size-md);
  max-width: 100vw;
}

.title {
  color: var(--gray-11);
  width: var(--size-md);
  max-width: 100vw;
  height: var(--title-height);
  gap: var(--size-2);
  padding: 3.25rem;
  animation: slide both ease;
  animation-timeline: scroll();
  /* 如果不需要动画时间轴，可以移除这行 */
  animation-range: var(--title-range);
}

@keyframes slide {

  0%,
  85% {
    color: var(--gray-11);
  }

  to {
    color: var(--gray-1);
    transform: translateX(calc(var(--size-12) * 0.5)) translateY(0);
  }
}

.title-wrapper {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  justify-content: center;
  animation: box-shadow both;
  /* 修改此行 */
  animation-timeline: scroll();
  /* 如果不需要动画时间轴，可以移除这行 */
  animation-range: var(--shadow-range);
}

@keyframes box-shadow {
  to {
    box-shadow: var(--shadow-4);
  }
}

.title h1 {
  margin: 0;
}

.title a {
  color: var(--red-6);
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-top: var(--size-8);
  display: grid;
  gap: var(--size-4);
}

.skeleton {
  --surface: var(--gray-4);
  --block: var(--gray-6);
  --padding: var(--size-4);
  padding: var(--padding);
  gap: var(--padding);
  width: 100%;
  display: grid;
  grid-template: 1fr 1fr / 25% 1fr;
  background: var(--surface);
  max-inline-size: 100%;
}

.skeleton__block {
  background: var(--block);
}

@keyframes load {
  to {
    background-position: 200% 0;
  }
}

.skeleton__block:first-of-type {
  grid-row: 1 / -1;
  aspect-ratio: 1;
}

.skeleton__block:last-of-type {
  width: 65%;
}
</style>