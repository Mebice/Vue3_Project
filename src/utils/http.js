//axios基礎的封装
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const httpInstance = axios.create({
baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
timeout:5000
})

// 攔截器

// axiosi請求攔截器
httpInstance.interceptors.request.use(config =>{
    // 從pinia獲取token數據
    const userStore = useUserStore()
    // 按照後端要求拼接token數據
    const token = userStore.userInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios響應式攔截器
httpInstance.interceptors.response.use(res => res.data, e => {
    // 統一錯誤提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    return Promise.reject(e)
    })
    
export default httpInstance