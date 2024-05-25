<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

const confirm = () => {
    console.log('用戶要登出了')
    // 退出登入邏輯實現
    // 1.清除用戶信息 觸發action
    userStore.clearUserInfo()
    // 2.跳轉到登入頁
    router.push('/Login')
}
</script>

<template>
    <div class="navArea">
        <div class="nav">
            <!-- 多模板渲染 區分登入狀態和非登入狀態 -->
            <!-- 登入時為第一個模板 登出時為第二個模板 判斷方式: 是否有token -->
            <template v-if="userStore.userInfo.token">
                <div class="name">
                    <div class="avatar">
                        <img :src="userStore.userInfo?.avatar" />
                    </div>
                    <a href="javascript:;">
                        {{ userStore.userInfo.account }}
                    </a>
                </div>

                <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                    <template #reference>
                        <a href="javascript:;">退出登录</a>
                    </template>
                </el-popconfirm>

                <a href="javascript:;">我的订单</a>
                <a class="lia" href="/member">会员中心</a>
            </template>
            <template v-else>
                <a href="javascript:;" @click="$router.push('/Login')">请先登录</a>
                <a href="javascript:;">帮助中心</a>
                <a class="lia" href="javascript:;">关于我们</a>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navArea {
    height: 40px;
    background-color: #304539;
    display: flex;
    align-items: center;
    justify-content: end;

    .nav {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-right: 50px;

        .name{
            display: flex;
            align-items: center;
        }

        a {
            color: #ffffff;
            text-decoration: none;
            padding: 0 10px;
            border-right: 1px solid #c0c0c0;
            line-height: 1; // 行高

            &:hover {
                color: #bccfc5;
            }


        }

        .avatar {
            background-color: #fff;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }


        .lia {
            padding: 0 10px;
            border-right: 1px solid #304539;
            line-height: 1; // 行高
        }

        i {
            margin-right: 5px;
        }
    }

}
</style>