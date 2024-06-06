<script setup>
import { getCheckInfoAPI, delAressAPI, addAddressAPI, updateAddressAPI, createOrderAPI } from '@/apis/checkout';
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus' // 警示框
import 'element-plus/theme-chalk/el-message.css' // 警示框樣式
import { Edit, Delete } from '@element-plus/icons-vue' // 圖標
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { regionData } from 'element-china-area-data'; // 引入省市区数据

const cartStore = useCartStore()
const router = useRouter()
const checkInfo = ref({})       // 订单对象
const curAddress = ref({})      // 默認地址
const showDialog = ref(false)   // 控制切換彈窗打開
const isDeleting = ref(false);  // 删除操作的状态
const addDialog = ref(false)    // 控制新增彈窗打開
const updateDialog = ref(false) // 控制修改彈窗打開
const radio = ref(null)         // 是否默認

// 新增地址表单
const form = ref({
    receiver: '',               // 姓名
    contact: '12345612345',     // 联系方式
    provinceCode: '00',        // 省份编码 使用選取
    cityCode: '0000',            // 城市编码 使用選取
    countyCode: '000000',          // 地区编码 使用選取
    address: '',                // 详细地址: 路
    postalCode: '',          // 邮政编码 使用選取 6位數
    addressTags: '家',         // 地址标签
    isDefault: 1,               // 收货地址是否默认 : 0是, 1不是
    fullLocation: [],           // 完整地址: 省市區
})
// 修改地址表單
const updateForm = ref({
    receiver: '',               // 姓名
    contact: '00123456789',     // 联系方式
    provinceCode: '100000',        // 省份编码
    cityCode: '100000',            // 城市编码
    countyCode: '100000',          // 地区编码
    address: '',                // 详细地址: 路
    postalCode: '100000',          // 邮政编码
    addressTags: '家',         // 地址标签
    isDefault: 1,               // 收货地址是否默认 : 0是, 1不是
    fullLocation: [],           // 完整地址: 省市區
})

// 獲取詳情
const getCheckInfo = async () => {
    const res = await getCheckInfoAPI()
    checkInfo.value = res.result
    // 適配默認地址
    // 從地址列表中渲染出來 isDefault === 0 那一項
    const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
    curAddress.value = item
    radio.value = item?.id || null
}

// 切換地址
const activeAddress = ref({})
const switchAddress = (item) => {
    activeAddress.value = item
    radio.value = item?.id || null
}
const confirm = async () => {
    // 如果未選擇任何地址，則使用默認地址
    if (!activeAddress.value.id) {
        curAddress.value = checkInfo.value.userAddresses.find(item => item.isDefault === 0);
    }
    // 更新选择的地址为默认地址
    if (radio.value) {  // activeAddress選擇後將isDefault: 0 默認
        await updateAddressAPI(activeAddress.value.id, { ...activeAddress.value, isDefault: 0 })
        // 更新其他地址为非默认地址
        // for (const address of checkInfo.value.userAddresses) {
        //     if (address.id !== activeAddress.value.id && address.isDefault === 0) {
        //         await updateAddressAPI(address.id, { ...address, isDefault: 1 });
        //     }
        // }
    }
    else {
        curAddress.value = activeAddress.value;
    }
    showDialog.value = false;
    // activeAddress.value = {};
    getCheckInfo()
}

// 刪除地址
const delAress = async (id) => {
    console.log(id)
    isDeleting.value = true;
    // 是否刪除
    await delAressAPI(id);
    getCheckInfo(); // 重新获取订单信息，刷新地址列表
    isDeleting.value = false;
}

// 配置省市區選擇器
const options = regionData;

// 準備規則對象
const rules = {
    receiver: [
        { required: true, message: '姓名不能為空', trigger: 'blur' }
    ],
    contact: [
        { required: true, message: '電話號碼不能為空', trigger: 'blur' },
        { min: 11, max: 11, message: '電話號碼格式不符', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '詳細地址不能為空', trigger: 'blur' }
    ],
    selectedOptions: [
        {
            validator: (rule, value, callback) => {
                console.log(value)
                // 自定義校驗邏輯
                if (value && value.length === 3) {
                    callback()
                } else {
                    callback(new Error('请选择完整的省市区'))
                }
            },
            trigger: 'change', // 触发校验的事件，可以根据需要修改
            required: true
        }
    ]
}

// 新增地址 獲取form實例做統一校驗
const formRef = ref(null)
const onAddAddress = () => {
    const { receiver, contact, address, selectedOptions } = form.value
    // const { receiver, contact, address } = form.value
    // // 調用實例方法
    formRef.value.validate(async (valid) => {
        // valid: 所有表單都通過校驗 才為 true
        console.log(valid) // 如果任一項為空 = false
        // 以valid作為判斷條件 如果通過校驗才執行
        if (valid === true) {  // 填寫完整 
            const [province, city, countyCode] = selectedOptions;
            const provinceCode = province + '0000'
            const cityCode = city + '00'
            const postalCode = countyCode
            await addAddressAPI({ ...form.value, provinceCode, cityCode, countyCode, postalCode })
            // await addAddressAPI(form.value)
            // 提示用戶
            ElMessage({ type: 'success', message: '新增成功' })
            addDialog.value = false;
            getCheckInfo()
            clearForm()
        } else {  // 任一項為空
            // 提示用戶
            ElMessage({ type: 'warning', message: '請填寫完整' })
        }
    })
}

// 修改地址
const onUpdateAddress = () => {
    formRef.value.validate(async (valid) => {
        if (valid === true) {
            // 获取省、市、区代码
            const [province, city, countyCode] = updateForm.value.selectedOptions;
            // 添加四个0
            const provinceCode = province + '0000';
            const cityCode = city + '00'
            const postalCode = countyCode
            await updateAddressAPI(updateForm.value.id, {
                ...updateForm.value,
                provinceCode,
                cityCode,
                countyCode,
                postalCode
            })
            ElMessage({ type: 'success', message: '修改成功' })
            updateDialog.value = false;
            showDialog.value = false
            // activeAddress.value = {}  // 回到未選狀態
            getCheckInfo()
            clearForm()
        } else {
            ElMessage({ type: 'warning', message: '請填寫完整' })
        }
    })
}

// 打開修改地址彈窗並賦值
const openUpdateDialog = (item) => {
    console.log(item)
    console.log(item.fullLocation)
    console.log(item.provinceCode, item.cityCode, item.countyCode)
    // 为了保持原始数据不变，先创建一个副本
    const updatedItem = { ...item }
    // 截取省份编码的末尾两位零
    updatedItem.provinceCode = item.provinceCode.slice(0, -4)
    // 截取城市编码的末尾两位零
    updatedItem.cityCode = item.cityCode.slice(0, -2)
    // 赋值给 updateForm
    updateForm.value = updatedItem;
    updateForm.value.selectedOptions = [updatedItem.provinceCode, updatedItem.cityCode, item.countyCode]
    console.log([updatedItem.provinceCode, updatedItem.cityCode, item.countyCode])
    // updateForm.value = { ...item }
    updateDialog.value = true
}

// 離開彈窗時重置或清空數據
const clearForm = () => {
    formRef.value.resetFields(); // 重置表单数据
    form.value.selectedOptions = []; // 清空 el-cascader 的值
    updateForm.value.selectedOptions = []; // 清空 el-cascader 的值
}

// 當 切換彈窗 打開時激活默認地址
// 監聽 showDialog 的變化
watch(showDialog, (newVal) => {
    if (newVal) {
        const defaultAddress = checkInfo.value.userAddresses.find(item => item.isDefault === 0);
        if (defaultAddress) {  // 只有當存在默認地址時才進行操作
            activeAddress.value = defaultAddress;
            radio.value = defaultAddress.id;
        }
    }
})

// 創建訂單
const createOrder = async () => {
    const res = await createOrderAPI({
        deliveryTimeType: 1,
        payType: 1,
        payChannel: 1,
        buyerMessage: '',
        goods: checkInfo.value.goods.map(item => {
            return {
                skuId: item.skuId,
                count: item.count
            }
        }),
        addressId: curAddress.value.id
    })
    const orderId = res.result.id
    router.push({
        path: '/pay',
        query: {
            id: orderId
        }
    })
    // 更新購物車
    cartStore.updateNewList()
}

onMounted(() => getCheckInfo())

</script>

<template>
    <div class="xtx-pay-checkout-page">
        <div class="container">
            <div class="wrapper">
                <!-- 收货地址 -->
                <h3 class="box-title">收货地址</h3>
                <div class="box-body">
                    <div class="address">
                        <div class="text">
                            <div class="none" v-if="!curAddress">您需要先添加收货地址才可提交订单。</div>
                            <ul v-else>
                                <li><span>收<i />货<i />人：</span>{{ curAddress.receiver }}</li>
                                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                                <li><span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
                            </ul>
                        </div>
                        <div class="action">
                            <el-button size="large" @click="showDialog = true">切换地址</el-button>
                            <el-button size="large" @click="addDialog = true">添加地址</el-button>
                        </div>
                    </div>
                </div>
                <!-- 商品信息 -->
                <h3 class="box-title">商品信息</h3>
                <div class="box-body">
                    <table class="goods">
                        <thead>
                            <tr>
                                <th width="520">商品信息</th>
                                <th width="170">单价</th>
                                <th width="170">数量</th>
                                <th width="170">小计</th>
                                <th width="170">实付</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in checkInfo.goods" :key="i.id">
                                <td>
                                    <a href="javascript:;" class="info">
                                        <img :src="i.picture" alt="">
                                        <div class="right">
                                            <p>{{ i.name }}</p>
                                            <p>{{ i.attrsText }}</p>
                                        </div>
                                    </a>
                                </td>
                                <td>&yen;{{ i.price }}</td>
                                <td>{{ i.count }}</td>
                                <td>&yen;{{ i.totalPrice }}</td>
                                <td>&yen;{{ i.totalPayPrice }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 配送时间 -->
                <h3 class="box-title">配送时间</h3>
                <div class="box-body">
                    <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
                    <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
                    <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
                </div>
                <!-- 支付方式 -->
                <h3 class="box-title">支付方式</h3>
                <div class="box-body">
                    <a class="my-btn active" href="javascript:;">在线支付</a>
                    <a class="my-btn" href="javascript:;">货到付款</a>
                    <span style="color:#999">货到付款需付5元手续费</span>
                </div>
                <!-- 金额明细 -->
                <h3 class="box-title">金额明细</h3>
                <div class="box-body">
                    <div class="total">
                        <dl>
                            <dt>商品件数：</dt>
                            <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
                        </dl>
                        <dl>
                            <dt>商品总价：</dt>
                            <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>运<i></i>费：</dt>
                            <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>应付总额：</dt>
                            <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
                        </dl>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="submit">
                    <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 切换地址 -->
    <el-dialog v-model="showDialog" title="切换收货地址" width="32%" center>
        <div class="addressWrapper">
            <div class="text item" :class="{ active: activeAddress.id === item.id }" @click="switchAddress(item)"
                v-for="item in checkInfo.userAddresses" :key="item.id">
                <!-- 默認地址 -->
                <el-radio-group v-model="radio" class="chooseDefault">
                    <el-radio :value="item.id, item" size="large"></el-radio>
                </el-radio-group>

                <ul>
                    <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
                    <li><span>联系方式：</span>{{ item.contact }}</li>
                    <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
                </ul>
                <!-- 修改按鈕 -->
                <el-button class="updateAddressBtn" @click="openUpdateDialog(item)" type="primary" :icon="Edit"
                    circle />
                <!-- 刪除按鈕 -->
                <el-popconfirm @confirm="delAress(item.id)" title="確認刪除嗎?" confirm-button-text="確認"
                    cancel-button-text="取消">
                    <template #reference>
                        <el-button class="delAddressBtn" type="danger" :icon="Delete" circle />
                    </template>
                </el-popconfirm>

            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加地址 -->
    <el-dialog v-model="addDialog" @close="clearForm" title="新增地址" width="400px" center>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px" status-icon>
            <el-form-item prop="receiver" label="收貨人">
                <el-input v-model="form.receiver" placeholder="請输入姓名" />
            </el-form-item>
            <el-form-item prop="contact" label="聯絡方式">
                <el-input v-model="form.contact" placeholder="請输入電話號碼" />
            </el-form-item>
            <el-form-item prop="selectedOptions" label="省/市/区">
                <el-cascader v-model="form.selectedOptions" :options="options" placeholder="请选择省市区" />
            </el-form-item>
            <el-form-item prop="address" label="詳細地址">
                <el-input v-model="form.address" placeholder="請输入詳細地址" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="onAddAddress">確認</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 修改地址 -->
    <el-dialog v-model="updateDialog" @close="clearForm" title="修改地址" width="400px" center>
        <el-form ref="formRef" :model="updateForm" :rules="rules" label-position="right" label-width="80px" status-icon>
            <el-form-item prop="receiver" label="收貨人">
                <el-input v-model="updateForm.receiver" placeholder="請输入姓名" />
            </el-form-item>
            <el-form-item prop="contact" label="聯絡方式">
                <el-input v-model="updateForm.contact" placeholder="請输入電話號碼" />
            </el-form-item>
            <el-form-item prop="selectedOptions" label="省/市/区">
                <el-cascader v-model="updateForm.selectedOptions" :options="options" placeholder="請選擇省市區" />
            </el-form-item>
            <el-form-item prop="address" label="收貨地址">
                <el-input v-model="updateForm.address" placeholder="請输入地址" />
            </el-form-item>
            <el-form-item prop="isDefault" label="是否默認">
                <el-input v-model="updateForm.isDefault" disabled placeholder="請输入0或1" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateDialog = false">取消</el-button>
                <el-button type="primary" @click="onUpdateAddress">確認</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
    padding: 5px 20px 20px 20px;
    background-color: #f5f5f5;

    .wrapper {
        background: #fff;
        padding: 0 20px;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);

        .box-title {
            font-size: 16px;
            font-weight: normal;
            padding-left: 10px;
            line-height: 70px;
            border-bottom: 1px solid #f5f5f5;
        }

        .box-body {
            padding: 20px 0;
        }
    }
}

.address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;

            li {
                line-height: 30px;
                list-style: none;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: #666666;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}

.goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    .info {
        display: flex;
        text-align: left;
        text-decoration: none;

        img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
        }

        .right {
            line-height: 24px;

            p {
                color: #000;

                &:last-child {
                    color: #999;
                }
            }
        }
    }

    tr {
        th {
            background: #f5f5f5;
            font-weight: normal;
        }

        td,
        th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
                border-left: 1px solid #f5f5f5;
            }

            &:last-child {
                border-right: 1px solid #f5f5f5;
            }
        }
    }
}

.my-btn {
    width: 228px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-right: 25px;
    color: #666666;
    display: inline-block;
    text-decoration: none;

    &.active,
    &:hover {
        border-color: #666666;
    }
}

.total {
    dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
            i {
                display: inline-block;
                width: 2em;
            }
        }

        dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;

            &.price {
                font-size: 20px;
                color: #666666;
            }
        }
    }
}

.submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
}

.addressWrapper {
    max-height: 500px;
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #edefed;
        padding-left: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;

        &.active,
        &:hover {
            // border-color: #d7dfd4;
            box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1); // 偏移 立體感 光暈 顏色深淺
            background: #f5f5f5;
        }

        .chooseDefault {
            position: absolute;
            left: 15px;
        }

        >ul {
            list-style: none;
            padding-top: 15px;
            // padding: 10px;
            // font-size: 14px;
            // line-height: 30px;
        }

        .updateAddressBtn {
            position: absolute;
            right: 50px;

            &:hover {
                color: #006aff;
            }
        }

        .delAddressBtn {
            position: absolute;
            right: 10px;

            &:hover {
                color: #ff0000;
            }
        }
    }
}
</style>