<script setup>
import { useCartStore } from '@/stores/cartStore';
const cartStore = useCartStore()

// 單選回調
const singleCheck = (i, selected) => {
    console.log(i, selected)
    // store cartList 數組 無法知道誰被選中
    // 除了selected再加上一個用來篩選的參數 - skuId
    cartStore.singleCheck(i.skuId, selected)
}

const allCheck = (selected) => {
    cartStore.allCheck(selected)
}
</script>

<template>
    <div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <!-- 全選 -->
                                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in cartStore.cartList" :key="i.id">
                            <td>
                                <!-- 單選框 -->
                                <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink to="/"><img :src="i.picture" alt="" /></RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ i.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ i.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" :min="1" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                    <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                        @confirm="delCart(i)">
                                        <template #reference>
                                            <a href="javascript:;">删除</a>
                                        </template>
                                    </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="cartStore.cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="購物車列表為空">
                                        <el-button type="primary">随便逛逛</el-button>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作欄 -->
            <div class="action">
                <div class="batch">
                    共 {{ cartStore.allCount }} 件商品，已選擇 {{ cartStore.selectedCount }} 件，商品合計：
                    <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary">下單結算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
            color: #999;
            padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
            color: #418a5e;
        }

        .xtx-numbox {
            margin: 0 auto;
            width: 120px;
        }
    }

    .red {
        color: #b14343;
    }

    .green {
        color: #418a5e;
    }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;

        img {
            width: 100px;
            height: 100px;
        }

        >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;

            .attr {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        .xtx-checkbox {
            color: #999;
        }

        .batch {
            a {
                margin-left: 20px;
            }
        }

        .red {
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}
</style>