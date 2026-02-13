import request from '../utils/request'

export default{
    //登入數據
    login(data){
        return request.post('/login',data)
    },

    //首頁數據(GET)
    index(){
        return request.get('/Index/index')
    },

    //訂單詳情（陪護師列表GET）
    h5Companion(){
        return request.get('/h5/companion')
    },

    //創建訂單(提交訂單POST)
    createOrder(data){
        return request.post('createOrder',data)
    },
    //訂單列表(訂單列表GET)
    orderList(params){
        return request.get('/order/list',{params})
    }


    


}