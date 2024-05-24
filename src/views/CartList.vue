<script setup>
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter()
const cartStore = useCartStore()

// 單選回調
const singleCheck = (i, selected) => {
    console.log(i, selected)
    // store cartList 數組 無法知道誰被選中
    // 除了selected再加上一個用來篩選的參數 - skuId
    // 調用更新購物車選中狀態的方法
    cartStore.singleCheck(i.skuId, selected);
    // 無論選中還是取消選中，都調用更新購物車商品選中狀態的方法
    cartStore.updateCart(i.skuId, { selected });
}

// 全選
const allCheck = (selected) => {
    cartStore.allCheck(selected) // 本地全選
    const ids = cartStore.cartList.map(item => item.skuId); // 在cartList中映射提取id
    cartStore.updateAllCart(selected, ids);
}


// 更改商品數量
// 數量變更回調
const handleCountChange = (skuId, count) => {
    cartStore.updateCart(skuId, { count }); // 調用更新購物車商品數量的方法
}

const goCheckout = () => {
    if (cartStore.selectedCount === 0) {
        ElMessage({
            message: '請選擇至少一項商品',
            type: 'warning',
        });
    } else {
        // 跳轉到結帳頁面
        router.push('/checkout');
    }
}

</script>

<template>
    <div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr v-if="cartStore.cartList.length > 0"> 
                            <th >
                                <!-- 全選 -->
                                <el-checkbox :model-value="cartStore.isAll" @change="allCheck" />
                            </th>
                            <th>商品信息</th>
                            <th width="80">单价</th>
                            <th width="250">数量</th>
                            <th width="50">小计</th>
                            <th width="150">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in cartStore.cartList" :key="i.id">
                            <td>
                                <!-- 單選框 -->
                                <el-checkbox :model-value="i.selected"
                                    @change="(selected) => singleCheck(i, selected)" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink :to="`/detail/${i.id}`"><img :src="i.picture" alt="" /></RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ i.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen; {{ i.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" @change="handleCountChange(i.skuId, i.count)"
                                    :min="1" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen; {{ (i.price * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                    @confirm="cartStore.delCart(i.skuId)">
                                    <template #reference>
                                        <a href="javascript:;">删除</a>
                                    </template>
                                </el-popconfirm>
                            </td>
                        </tr>
                        <tr v-if="cartStore.cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="購物車列表為空">
                                        <el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作欄 -->
            <div class="action" v-if="cartStore.cartList.length > 0">
                <div class="batch">
                    共 {{ cartStore.allCount }} 件商品，已選擇 {{ cartStore.selectedCount }} 件，商品合計：
                    <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary" @click="goCheckout">下單結算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
    padding: 20px;
    background-color: #f5f5f5;

    .cart {
        background: #fff;
        color: #666;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px ;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 50px;
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
        padding: 60px 450px;
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
            text-decoration: none;
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
        margin-left: 50px;

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
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

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