<script setup>
import DetailHot from '@/components/Detail/DetailHot.vue'
import { getDetail } from '@/apis/detail'
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore()
const goods = ref({})
const route = useRoute()
const getGoods = async () => {
    const res = await getDetail(route.params.id)
    goods.value = res.result
}
onMounted(() => getGoods())

// sku規格被操作時
let skuObj = {}
const skuChange = (sku, skus) => {
    console.log(sku, skus)
    skuObj = sku
    // 根据所选的SKU更新价格，隨著選取不同規格大小價錢也可能不一樣
    if (sku.price) {
        goods.value.price = sku.price;
    }
    // 更新商品规格文本
    if (sku.specsText) {
        goods.value.attrsText = sku.specsText;
    }
    // 更新商品圖片
    if (sku.picture) {
        goods.value.picture = sku.picture;
    }
}

// count
const count = ref(1)
const countChange = (count) => {
    console.log(count)
}

// 添加購物車
const addCart = () => {
    if (skuObj.skuId) {
        // 規格已選 觸發action
        cartStore.addCart({
            id: goods.value.id, // 商品id
            name: goods.value.name, // 商品名稱
            picture: goods.value.mainPictures[0], // 圖片
            price: skuObj.price || goods.value.price, // 最新價格
            count: count.value, // 商品數量
            skuId: skuObj.skuId, // skuId
            attrsText: skuObj.specsText, // 商品規格文本
            selected: true // 商品是否選中
        })
        ElMessage.success('加入購物車成功')
    } else {
        // 規格未選 提示用戶
        ElMessage.warning('請選擇規格')
    }
}

// 控制图片放大
const isImageZoomed = ref(false)
const toggleImageZoom = () => {
    isImageZoomed.value = !isImageZoomed.value
}

</script>

<template>
    <div class="xtx-goods-page">
        <div class="container">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
                    <!-- 
                        錯誤原因：goods一開始{}  {}.categories -> undefined  -> undefined[1]
                        1. 可選鍊的語法?. => 如果前面有值才繼續往後運算   比較快，但要添加較多個
                        2. v-if 手動控制渲染時機 保證只有數據存在才渲染 => container後面加 v-if="goods.details"  比較慢，但就加v-if就好
                    -->
                    <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }">{{
                        goods.categories?.[1].name }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{
                        goods.categories?.[0].name }}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <XtxImageView :image-list="goods.mainPictures" />
                            <!-- 统计数量 -->
                            <ul class="goods-sales">
                                <li>
                                    <p>销量人气</p>
                                    <p> {{ goods.salesCount }} </p>
                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>商品评价</p>
                                    <p> {{ goods.commentCount }} </p>
                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏人气</p>
                                    <p> {{ goods.collectCount }} </p>
                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>品牌信息</p>
                                    <!-- 找不到name可能還來不及找到brand 就渲染了 => 解決:可選鍊?. -->
                                    <p> {{ goods.brand?.name }} </p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                                </li>
                            </ul>
                        </div>
                        <div class="spec">
                            <!-- 商品信息區 -->
                            <p class="g-name">{{ goods.name }}</p>
                            <p class="g-desc">{{ goods.desc }}</p>
                            <p class="g-price">
                                <span>{{ goods.price }}</span>
                                <span>{{ goods.price }}</span>
                            </p>
                            <p>{{ goods.attrsText }}</p>
                            <!-- 點擊商品圖片會放大 -->
                            <img class="produtPic" :src="goods.picture" @click="toggleImageZoom" alt="商品图片"
                                height="200px">

                            <!-- sku组件 -->
                            <XtxSku :goods="goods" @change="skuChange" />
                            <!-- 数据组件 -->
                            <el-input-number v-model="count" @change="countChange" :min="1" />
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                            <!-- <div class="g-service">
                                <dl>
                                    <dt>促销</dt>
                                    <dd>12月好物放送，App领券購買直降120元</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>無憂退货</span>
                                        <span>快速退款</span>
                                        <span>免費包郵</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div> -->

                        </div>
                    </div>
                    <div class="goods-footer">
                        <div class="goods-article">
                            <!-- 商品详情 -->
                            <div class="goods-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="goods-detail">
                                    <!-- 属性 -->
                                    <ul class="attrs">
                                        <li v-for="item in goods.details?.properties" :key="item.value">
                                            <span class="dt">{{ item.name }}</span>
                                            <span class="dd">{{ item.value }}</span>
                                        </li>
                                    </ul>
                                    <!-- 图片 -->
                                    <img v-for="img in goods.details?.pictures" :src="img" :key="img" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 24热榜+专题推荐 -->
                        <div class="goods-aside">
                            <!-- 24小時 榜單 -->
                            <DetailHot :hotPros-type="1" />
                            <!-- 周 榜單 -->
                            <DetailHot :hotPros-type="2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 放大的图片 -->
    <div v-if="isImageZoomed" class="zoomed-image-container" @click="toggleImageZoom">
        <img :src="goods.picture" alt="放大的商品图片" />
    </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
    padding: 0 20px;
    background-color: #f5f5f5;

    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;
        padding-left: 30px;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 0px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            height: min-content;
            box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: #572424;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: #3e1b1b;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: #481e1e;
                    }
                }
            }
        }
    }

    .goods-sales {
        display: flex;
        width: 500px;
        align-items: center;
        text-align: center;
        list-style: none;
        margin-top: 50px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: #401c1c;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: #4e2222;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: #522727;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: #421c1c;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;

}

.bread-container {
    padding: 25px 0;
}

.produtPic {
    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 0 3px 4px rgb(0 0 0 / 20%);
        cursor: zoom-in; // 放大鏡
    }
}

/* 放大圖片的樣式 */
.zoomed-image-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(250, 252, 249, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.zoomed-image-container img {
    max-width: 120%;
    max-height: 120%;
}
</style>