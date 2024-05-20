import request from '../utils/http'

// 獲取詳情接口
export const getCheckInfoAPI = () => {
    return request ({
        url: '/member/order/pre'
    })
}

// 刪除收貨地址
export const delAressAPI = (id) => {
    return request ({
        url: `/member/address/${id}`,
        method: 'DELETE'
    })
}

// 新增收貨地址
export const addAddressAPI = (data) => {
    return request ({
        url: '/member/address',
        method: 'POST',
        data
    })
}

// 修改收貨地址
export const updateAddressAPI = (id, data) => {
    return request ({
        url: `/member/address/${id}`,
        method: 'PUT',
        data
    })
}

// 創建訂單
export const createOrderAPI = (data) => {
    return request ({
        url: '/member/order',
        method: 'POST',
        data
    })
}
