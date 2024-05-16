<script setup>
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

</script>

<template>
    <div class="home-category">
        <div class="cover"></div>
        <ul class="menu">
            <li v-for="item in categoryStore.categoryList" :key="item.id">
                <RouterLink class="linkItem" to="/">{{ item.name }}</RouterLink>
                <RouterLink class="linkItem" v-for="i in item.children.slice(0, 2)" :key="i" to="/">{{ i.name }}
                </RouterLink>
                <!-- 弹层layer位置 -->
                <div class="layer">
                    <h4>分類推薦 <small>根據您的購買或瀏覽紀錄推薦</small></h4>
                    <ul>
                        <li v-for="i in item.goods" :key="i.id">
                            <RouterLink to="/">
                                <img :src="i.picture" alt="" />
                                <div class="info">
                                    <p class="name ellipsis-2">
                                        {{ i.name }}
                                    </p>
                                    <p class="desc ellipsis">{{ i.desc }}</p>
                                    <p class="price"><i>¥</i>{{ i.price }}</p>
                                </div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang='scss'>
.home-category {
    width: 280px;
    height: 500px;
    background: #304539;
    position: relative;
    z-index: 99;

    .cover {
        width: 30px;
        height: 500px;
        background-color: #e7e7e7;
        position: absolute;
        left: 0;
    }

    .menu {

        li {
            padding-left: 20px;
            height: 55px;
            line-height: 55px;
            // list-style:none;

            &:hover {
                background: #84978d;
            }

            a {
                margin-right: 4px;
                color: #fff;

                // &:first-child {
                //     font-size: 16px;
                // }
            }

            .linkItem {
                text-decoration: none;
            }

            .layer {
                width: 1000px;
                height: 500px;
                background: #e7e7e7;
                position: absolute;
                left: 280px;
                top: 0;
                display: none;

                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;
                    margin-left: 50px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;

                    li {
                        width: 280px;
                        height: 120px;
                        padding-left: 0;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #a8b7af;
                        border-radius: 4px;
                        background: #fff;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }

                        a {
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            justify-content: center;
                            text-decoration: none;
                            // padding: 10px;

                            &:hover {                                
                                background: #e7eeea;
                            }

                            img {
                                width: 100px;
                                height: 100px;
                                margin-left: 10px;
                            }

                            .info {
                                padding: 10px 10px 0 10px;
                                line-height: 14px;
                                overflow: hidden;

                                .name {
                                    font-size: 14px;
                                    color: #666;
                                }

                                .desc {
                                    font-size: 12px;
                                    color: #999;
                                }

                                .price {
                                    font-size: 14px;
                                    color: #666;

                                    i {
                                        font-size: 12px;
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 关键样式  hover状态下的layer盒子变成block
            &:hover {
                .layer {
                    display: block;
                }
            }
        }
    }
}
</style>