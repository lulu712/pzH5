<template>
    <h1>用戶登錄</h1>
    <van-form @submit="onSubmit">
         <van-cell-group inset>
             <van-field
                v-model="form.username"
                name="用戶名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '請填寫用戶名' }]"
            />
             <van-field
                v-model="form.password"
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
import { reactive } from 'vue';

//表單數據
const form=reactive({
    username:'',
    password:''
})


//表單提交
const onSubmit=()=>{

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