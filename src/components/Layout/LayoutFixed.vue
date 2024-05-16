<script setup>
import { useCategoryStore } from '@/stores/categoryStore'
// vueUse
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)

// 使用 pinna 管理
const categoryStore = useCategoryStore()

</script>
<template>
    <div class="header-sticky" :class="{ show: y > 120 }">
        <!-- {{ y }} -->
        <img src="/logo.png" alt="">
        <RouterLink class="link" to="/">首頁</RouterLink>
        <div class="routerItem" v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink class="link" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </div>
        <div class="searchArea">
            <input type="text" name="" id="" placeholder="搜尋"> <i class="fa-solid fa-magnifying-glass"></i>

        </div>
        <i class="fa-solid fa-cart-shopping"></i>
    </div>
</template>

<style lang="scss" scoped>
.header-sticky {
    width: 98.7vw;
    height: 60px;
    color: #304539;
    background-color: #fff;
    border-bottom: 1px solid #7a8d78;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-weight: 700;
    position: fixed;
    top: 0;
    z-index: 999;
    // 往上平移高度 + 透明
    transform: translateY(-100%);
    opacity: 0;

    // 移除平移 + 不透明
    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    img {
        width: 130px;
        height: 50px;
    }

    .link {
        color: #304539;
        text-decoration: none;

        &:hover {
            color: #8daa9a;
        }
    }

    input {
        width: 150px;
        height: 25px;
        border: white;
        border-bottom: 2px solid #82998b;
        padding-left: 5px;
    }

    .fa-magnifying-glass {
        font-size: 16pt;

        &:hover {
            cursor: pointer;
            color: #9eb3a7;
        }
    }

    .fa-cart-shopping {
        font-size: 20pt;
    }
}
</style>