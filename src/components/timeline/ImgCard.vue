<template>
    <div class="card-title">
        <div class="card-content">
            <span>{{ cardData.title }}</span>
        </div>
        <div class="card-desc">
            <span v-html=cardData.description></span>
        </div>
    </div>
    <main class="my-component">
        <section>
            <div class="imageGallery">
                <button v-for="(img, index) in cardData.imgList" :key="index" @click="openDialog(index)">
                    <picture>
                        <img :src="img.url" :alt="img.url" height="309" loading="lazy" width="309" />
                    </picture>
                </button>
            </div>

            <dialog class="dialog" id="dialog">
                <div class="dialogContainer">
                    <div class="carousel" id="carousel">
                        <picture v-for="(img, index) in cardData.imgList" :key="index">
                            <img :src="img.url" :alt="img.url" height="309" loading="lazy" width="309" />
                        </picture>
                    </div>
                    <div class="controls">
                        <button @click="scroll(-100)">
                            <i class="ri-arrow-left-circle-fill"></i>
                        </button>
                        <button @click="scroll(100)">
                            <i class="ri-arrow-right-circle-fill"></i>
                        </button>
                    </div>
                </div>
                <button class="closeDialog" id="closeDialogBtn">
                    <i class="ri-close-line"></i>
                </button>
            </dialog>
        </section>
    </main>
</template>
<script setup>

import { ref, onMounted, nextTick } from 'vue';
// 通过 defineProps 获取 props
const { cardData } = defineProps(['cardData']);
// console.log('cardData',cardData)

// 创建对话框和轮播的引用
const dialog = ref(null);
const carousel = ref(null);



// 图片数组
const images = ref([]);

// 滚动函数
const scroll = (offset) => {
    carousel.value.scrollBy({ left: offset, behavior: 'smooth' });
};

// 打开对话框函数
const openDialog = (index) => {
    const dialog = document.querySelector('.dialog');
    console.log(cardData.imgList);
    if (!document.startViewTransition) {
        dialog.showModal();
        // 使用 nextTick 等待下一次 DOM 更新
        nextTick(() => {
            scrollToImage(index);
        });
    } else {
        handleTransition(index);
    }
};


// 处理过渡函数
const handleTransition = async (index) => {
    const dialog = document.querySelector('.dialog');
    const transition = document.startViewTransition(() => dialog.showModal());

    try {
        await transition.finished;
    } finally {
        scrollToImage(index);
    }
};

// 滚动到指定图片函数
const scrollToImage = (index) => {
    console.log(index)
    const images = document.querySelectorAll('#carousel img');
    console.log(images[index]);
    images[index].scrollIntoView();
};

// 关闭对话框函数
const closeDialog = () => {
    const dialog = document.querySelector('.dialog');
    if (!document.startViewTransition) {
        dialog.close();
    } else {
        document.startViewTransition(() => dialog.close());
    }
};

// 在组件挂载后执行的操作
onMounted(() => {
    // 获取关闭对话框按钮的引用
    const closeDialogBtn = document.querySelector('#closeDialogBtn');
    // 添加关闭对话框按钮的点击事件监听
    closeDialogBtn.addEventListener('click', closeDialog);
    // 获取轮播容器的引用
    carousel.value = document.querySelector('.carousel');
});
</script>





<style scoped>
@import url("https://npm.onmicrosoft.cn/hexo-tool-cc@1.1.5/source/kdg/css/open-props.min.css") layer(design.system);
@import url("../../assets/css/gh/normalize.dark.min.css")layer(base.normalize);
@import url("../../assets/css/card/remixicon.css");
/* @import url("https://unpkg.com/open-props/normalize.dark.min.css"); */



@layer base.override-normalize {
    :root {
        font-family: 'Inter Variable', sans-serif;
        --surface-1: oklch(0 0 0);
        --text-1: oklch(0.97 0 0);
        --text-2: oklch(0.73 0 0);
        --link-visited: oklch(0.73 0 0);
    }

    a {
        color: var(--text-2);
        display: flex;
        gap: var(--size-1);
    }
}


@layer components.header {
    header {
        display: flex;
        justify-content: center;
        padding-block: var(--gap);
        background-color: var(--surface-1);
        position: sticky;
        inset-block-start: 0;
        z-index: var(--layer-1);

        & h1 {
            font-family: 'Lobster', sans-serif;

            font-weight: var(--font-weight-1);
            font-size: clamp(1.5rem, 6vw, 3rem);
        }
    }
}

@layer components.gallery {
    .imageGallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-inline-size: var(--max-inline);
        gap: calc(var(--border-size-2) * 2);

        & img {
            aspect-ratio: var(--ratio-square);
            max-inline-size: 100%;
            background-image: var(--gradient-8);
        }

        &>button {
            position: relative;
            padding: 0;
            margin: 0;
            border: none;

            &::after {
                content: '';
                inset: 0;
                display: block;
                background-color: oklch(0 0 0 / 0.4);
                position: absolute;
                background-image: url(https://raw.githubusercontent.com/mobalti/open-props-interfaces/7d7d59bdb5dca71ec7280b88876b45d31cbf3c4a/image-gallery/images/pushpin-fill.svg);
                background-size: var(--size-5);
                background-repeat: no-repeat;
                background-position: top var(--size-1) right var(--size-1);
                opacity: 0;
                transition: 0.2s ease;
            }

            &:hover::after {
                opacity: 1;
            }
        }
    }
}

@layer components.dialog {
    .dialog {
        --sm-font-size: 0.875rem;
        --size: min(80dvh, 100%);
        --fade-duration: 1s;

        inline-size: var(--size);
        max-inline-size: 600px;
        border-radius: unset;

        padding: 0;

        .dialog-container {
            display: flex;
            flex-direction: column;
            gap: var(--size-3);
            position: relative;
            overflow: hidden;
        }

        .controls {
            position: fixed;
            z-index: var(--layer-1);
            inset-block-start: calc(50% - var(--size-5) / 2);
            inset-inline: var(--size-3);
            display: flex;
            justify-content: space-between;
            opacity: 0;
            animation: var(--animation-fade-in) var(--fade-duration) forwards;

            & button {
                inline-size: var(--size-8);
                border-radius: var(--radius-round);
                aspect-ratio: var(--ratio-square);
                font-size: 1.75rem;
                background: transparent;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                box-shadow: var(--shadow-1);
                color: var(--stone-1);
                transition: color 0.2s ease;

                @media (width > 600px) {
                    font-size: 3rem;
                }

                &:hover {
                    color: var(--stone-6);
                }
            }
        }

        .closeDialog {
            position: fixed;
            inset-block-start: var(--size-2);
            inset-inline-end: var(--size-2);
            block-size: 48px;
            inline-size: 48px;
            background-color: transparent;
            font-size: var(--font-size-5);
            padding: 0;
        }

        .carousel {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: var(--size);
            inline-size: var(--size);
            block-size: var(--size);


            /* Hide scrollbar */
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;

            /* Firefox */
            &::-webkit-scrollbar {
                display: none;
            }

            & img {
                inline-size: 100%;
                block-size: 100%;
            }

            &::after {
                content: '';
                position: absolute;
                inset: 0;

                background-color: var(--surface-1);

                background-image: url(https://raw.githubusercontent.com/mobalti/open-props-interfaces/7d7d59bdb5dca71ec7280b88876b45d31cbf3c4a/image-gallery/images/bars-rotate-fade.svg);
                background-repeat: no-repeat;
                background-position: center;
                z-index: var(--layer-3);

                /* <Suspense> */
                animation: var(--animation-fade-out) var(--fade-duration) forwards,
                    var(--fade-duration) op-hide 1s forwards;
            }
        }
    }
}

@layer animation.base {
    @keyframes op-hide {
        100% {
            visibility: hidden;
        }
    }
}

@layer animation.scroll-driven {
    body {
        timeline-scope: --carousel;
    }

    #carousel {
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        overscroll-behavior: contain;
        scroll-behavior: smooth;

        scroll-timeline: --carousel inline;

        >* {
            scroll-snap-align: center;
        }
    }

    #nextBtn {
        animation: auto next ease;
        animation-timeline: --carousel;

        /* fix bug scrollPort nextBtn visibility */
        animation-range: 0% 101%;
    }

    #prevBtn {
        animation: auto prev ease;
        animation-timeline: --carousel;
    }

    @keyframes prev {
        from {
            visibility: hidden;
        }
    }

    @keyframes next {

        99%,
        100% {
            visibility: hidden;
        }
    }
}

@layer components.footer {
    footer {
        display: flex;
        justify-content: center;
        padding-block: var(--gap);
        font-weight: var(--font-weight-8);
        color: var(--stone-8);
    }
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
</style>