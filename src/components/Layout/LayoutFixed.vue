<script setup>
import HeaderCart from './HeaderCart.vue'
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
        <RouterLink class="link" exact-active-class="active" to="/">首頁</RouterLink>
        <div class="routerItem" v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink class="link" active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </div>
        <div class="search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="搜尋">
        </div>

        <HeaderCart />

    </div>
</template>

<style lang="scss" scoped>
.header-sticky {
    width: 98.7vw;
    height: 60px;
    color: #304539;
    background-color: #fff;
    border-bottom: 2px solid #d5ded5;
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
            border-bottom: 2px solid #d5ded5;
        }
    }

    .active {
        color: #8daa9a;
        border-bottom: 2px solid #d5ded5;
    }

    .search {
        position: relative;
        border-bottom: 1.5px solid #cfded6;
        line-height: 32px;
        margin-left: 30px;

        .fa-magnifying-glass {
            font-size: 18px;
        }

        input {
            outline: none; // 框框隱藏
            border: none;
            padding-bottom: 0;
            padding-left: 5px;

            &:hover {
                border: none;
            }
        }
    }
}
</style>