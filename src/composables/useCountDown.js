// 封裝倒計時邏輯函數
import { computed, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

export const useCountDown = () => {
    const router = useRouter()
    // 1.響應式的數據
    const time = ref(0)

    // 格式化時間為xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

     // 定时器标识符
    let timer = null;

    // 2.開啟倒計時的函數
    const start = (currentTime) => {
        // 更新倒计时时间
        time.value = currentTime;
        
        // 清除之前的定时器
        clearInterval(timer);

        // 开启新的定时器
        timer = setInterval(() => {
            time.value--; // 每秒减一
            if (time.value <= 0) {
                clearInterval(timer);
                onTimeEnd(); // 时间归零时执行跳转操作
            }
        }, 1000);
    }
    // 組件銷毀時清除定時器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })

    // 时间归零时执行的操作
    const onTimeEnd = () => {
        // 跳转到首页
        router.push('/');
    };

    return {
        formatTime,
        start
    }
}


