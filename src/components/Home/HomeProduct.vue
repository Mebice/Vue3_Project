<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'
import GoodsItem from '@/components/Home/GoodsItem.vue'

const goodsProduct = ref([])
const getGoods = async () => {
    const res = await getGoodsAPI()
    console.log("產品區", res)
    goodsProduct.value = res.result
}

onMounted(() => getGoods())
</script>

<template>
    <div class="home-product">
        <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
            <div class="box">
                <RouterLink class="cover" :to="`/category/${cate.id}`">
                    <img v-img-lazy="cate.picture" />
                    <strong class="label">
                        <span>{{ cate.name }}馆</span>
                        <span>{{ cate.saleInfo }}</span>
                    </strong>
                </RouterLink>
                <ul class="goods-list">
                    <li v-for="goods in cate.goods" :key="goods.id">
                        <GoodsItem :goods="goods" />
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style scoped lang='scss'>
.home-product {
    background: #fff;
    // margin-top: 20px;
    // margin-bottom: 50px;

    // .sub {
    //     margin-bottom: 2px;

    //     a {
    //         padding: 2px 12px;
    //         font-size: 16px;
    //         border-radius: 4px;

    //         &:hover {
    //             background: #999;
    //             color: #fff;
    //         }

    //         &:last-child {
    //             margin-right: 80px;
    //         }
    //     }
    // }

    .box {
        display: flex;

        .cover {
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, 0.9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }

        .goods-list {
            width: 990px;
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 10px;
                margin-bottom: 10px;
                list-style: none;

                &:nth-last-child(-n + 4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }

        .goods-item {
            display: block;
            width: 150px;
            height: 320px;
            text-align: center;
            transition: all .5s;
            text-decoration: none;

            &:hover {
                transform: translate3d(0, -3px, 0);
                box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
            }

            img {
                width: 160px;
                height: 160px;
                margin-bottom: 10px;
            }

            p {
                text-align: center;
                text-overflow: ellipsis; //超出文字部分以點點點表示
                overflow: hidden; //超出隱藏
                white-space: nowrap; //不換行
            }

            .name {
                font-size: 16px;
                color: #000;
            }

            .desc {
                color: #999;
                height: 29px;
            }

            .price {
                color: #552f2f;
                font-size: 20px;
            }
        }
    }
}
</style>