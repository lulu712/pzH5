import request from '../utils/request'

export default{
    //登入數據
    login(data){
        return request.post('/login',data)
    },

    //首頁數據(GET)
    index(){
        return request.get('/Index/index')
    }




}