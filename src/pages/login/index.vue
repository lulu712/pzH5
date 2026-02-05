<template>
    <h1>用戶登錄</h1>
    <van-form @submit="onSubmit">
         <van-cell-group inset>
             <van-field
                v-model="form.userName"
                name="用戶名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '請填寫用戶名' }]"
            />
             <van-field
                v-model="form.passWord"
                type="password"
                name="密碼"
                label="密碼"
                placeholder="密碼"
                :rules="[{ required: true, message: '請填寫密碼' }]"
            />
        </van-cell-group>
        <div class="btn">
            <van-button native-type="submit" round block  type="primary">提交</van-button>
        </div>
    </van-form>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';



// 獲取當前Vue實例
const { proxy } = getCurrentInstance()
const router = useRouter()

// 表單數據
const form = reactive({
     userName:'13797053405',
     passWord:'123456',
})

// 表單提交
const onSubmit = async () => {
    try {
        const { data }= await proxy.$api.login(form)
        console.log(data, 'login response')
        if (data.code === 10000) {
            showToast('登錄成功')
            localStorage.setItem('h5_token', data.data.token)
            localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
            router.push('/home')
        } else {
            showToast(data.message || '登錄失敗')
        }
    } catch (error) {
        console.error(error)
        showToast('請求失敗，請稍後再試')
    }
}


</script>

<style lang="less" scoped>
h1{
    text-align: center;
   
}
.btn{
    margin: 20px;
}


</style>