<script setup>
import { getOrderAPI } from '@/apis/pay';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const orderInfo = ref({})
const route = useRoute()

const getOrderInfo = async() => {
    const res = await getOrderAPI(route.query.orderId)
    orderInfo.value =  res.result
}

onMounted(() => getOrderInfo())
</script>


<template>
    <div class="xtx-pay-page">
        <div class="container">
            <!-- 支付结果 -->
            <div class="pay-result">
                <!-- 路由參數獲取到的是字符串而不是布爾值 -->
                <i class="fa-solid fa-circle-check" v-if="$route.query.payResult === 'true'"></i>
                <i class="fa-solid fa-circle-xmark" v-else></i>
                <p class="tit">支付{{ $route.query.payResult === 'true' ? '成功':'失敗' }}</p>
                <p class="tip" v-show="$route.query.payResult === 'true'">我们将尽快为您发货，收货期间请保持手机畅通</p>
                <p>支付方式：<span>支付宝</span></p>
                <p>支付金额：<span>¥{{ orderInfo.payMoney?.toFixed(2) }}</span></p>
                <div class="btn">
                    <el-button @click="$router.push('/member/order')" type="primary" style="margin-right:20px">查看订单</el-button>
                    <el-button @click="$router.push('/')">进入首页</el-button>
                </div>
                <p class="alert">
                    <span class="iconfont icon-tip"></span>
                    温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pay-result {
    padding: 100px 0;
    background: #fff;
    text-align: center;

    .fa-circle-check {
        font-size: 50pt;
        color: #1dc779;
        margin-bottom: 25px;
    }

    .fa-circle-xmark {
        font-size: 50pt;
        color: #d71b1b;
        margin-bottom: 25px;
    }

    .tit {
        font-size: 24px;
    }

    .tip {
        color: #999;
    }

    p {
        line-height: 30px;
        font-size: 16px;
    }

    .btn {
        margin-top: 20px;
    }

    .alert {
        font-size: 12px;
        color: #999;
        margin-top: 50px;
    }
}
</style>