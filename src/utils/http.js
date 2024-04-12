//axios基礎的封装
import axios from 'axios'
const httpInstance = axios.create({
baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
timeout:5000
})
//攔截器
//axiosi請求攔截器
httpInstance.interceptors.request.use(config =>{
return config
},e => Promise.reject(e))
//axiosl響應式攔截器
httpInstance.interceptors.response.use(res => res.data,e => {
return Promise.reject(e)
})
export default httpInstance