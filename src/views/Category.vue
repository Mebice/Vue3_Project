<script setup>
import GoodsItem from '@/components/Home/GoodsItem.vue'
import { useBanner } from '@/composables/Category/useBanner'
import { useCategory } from '@/composables/Category/useCategory'

const { bannerList} = useBanner()
const { categoryData } = useCategory()
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->  
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 輪播圖 -->
            <div class="home-banner">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink :to="`/category/sub/${i.id}`">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.top-category {
    padding: 0 20px 20px 20px;
    background-color: #f5f5f5;

    h3 {
        padding-top: 10px;
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
    }

    .sub-list {
        margin-top: 30px;
        background-color: #fff;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 155px;
                list-style:none;


                a {
                    color: $mainColor;
                    text-align: center;
                    text-decoration: none;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    &:hover {
                        color: $hoverColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 20px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }

    .home-banner {
        width: 100%;
        height: 500px;
        margin: 0 auto;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        img {
            width: 100%;
            height: 500px;
        }
    }

}
</style>