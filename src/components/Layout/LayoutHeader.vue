<script setup>
import HeaderCart from './HeaderCart.vue';
import { useCategoryStore } from '@/stores/categoryStore'

// 使用 pinna 管理
const categoryStore = useCategoryStore()

</script>

<template>
    <div class="bgArea">
        <img src="/logo.png" alt="">
        <RouterLink class="link" exact-active-class="active" to="/">首頁</RouterLink>
        <div class="rounterItem" v-for="item in categoryStore.categoryList" :key="item.id">
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
.bgArea {
    height: 80px;
    color: #304539;
    border-bottom: 2px solid #d5ded5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-weight: 700;

    img {
        width: 140px;
        height: 60px;
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