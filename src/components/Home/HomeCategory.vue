<script setup>
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

</script>

<template>
    <div class="home-category">
        <dl class="menu">
            <dt v-for="item in categoryStore.categoryList" :key="item.id">
                <RouterLink class="linkItem" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
                <RouterLink class="linkItem" v-for="i in item.children.slice(0, 2)" :key="i" :to="`/category/${item.id}`">
                    {{ i.name }}
                </RouterLink>
                <!-- 弹层layer位置 -->
                <div class="layer">
                    <h4>分類推薦 <small>根據您的購買或瀏覽紀錄推薦</small></h4>
                    <ul>
                        <li v-for="i in item.goods" :key="i.id">
                            <RouterLink :to="`/detail/${i.id}`">
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
            </dt>
        </dl>
    </div>
</template>

<style scoped lang='scss'>
.home-category {
    width: 280px;
    height: 495px;
    background: #304539;
    position: relative;
    z-index: 99;

    .menu {

        dt {
            padding-left: 40px;
            height: 55px;
            line-height: 55px;

            &:hover {
                background: #84978d;
            }

            a {
                margin-right: 4px;
                color: #fff;
            }

            .linkItem {
                text-decoration: none;
            }

            .layer {
                width: 1000px;
                height: 495px;
                background: rgba(229, 235, 233, 0.8);
                position: absolute;
                left: 280px;
                top: 0;
                display: none;

                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;
                    margin-left: 50px;
                    margin-top: -1px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    padding-left: 4%;
                    list-style: none;
                    margin-top: -30px;

                    li {
                        width: 280px;
                        height: 120px;
                        padding-left: 0;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #a8b7af;
                        border-radius: 4px;
                        background: #fff;
                        box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);

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

                            &:hover {                                
                                border: 1.5px solid #304539;
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