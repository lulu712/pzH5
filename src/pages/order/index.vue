<template>
    <div class="container">
        <div class="header">我的訂單</div>

        <van-tabs @click-tab="onClickTab" v-model:active="active">
            <van-tab title="全部" name="" />
            <van-tab title="待支付" name="1" />
            <van-tab title="待服務" name="2" />
            <van-tab title="已完成" name="3" />
            <van-tab title="已取消" name="4" />
        </van-tabs>
        <van-row @click="goDetail(item)" v-for=" item in order " :key="item.out_trade_no">
            <van-col span="5">
                <van-image width="50" height="50px" radius="5" :src="item.serviceImg"/>
            </van-col>
            <van-col sapn="14">
                <div class="text1">
                    {{ item.service_name }}
                </div>
                <div class="text2">
                    <div>{{ item.hospital_name }}</div>
                    <div>預約時間：{{ item.starttime}}</div>
                </div>
            </van-col>
            <van-col class="text2" :style="{color: colorMap[item.trade_state]}" sapn="5">
                {{ item.trade_state }}
                <counter :second="item.timer" v-if="item.trade_state === '待支付' " />
            </van-col>
        </van-row>
        <div class="bottom-text">沒有更多了</div>
    </div>
</template>

<script setup>
import { ref,getCurrentInstance,onMounted } from 'vue';
import counter from '../../components/counter.vue';
import { useRouter } from 'vue-router';

const colorMap= {
    '待支付':'#ffa200',
    '待服务':'#1da6fd',
    '已完成':'#21c521'
}

onMounted(()=>{
    getOrderList('')
})

const order = ref([])
//獲取當前Vue實例
const { proxy } = getCurrentInstance()


//獲取訂單列表
const getOrderList =async (state) => {
   const{data} = await proxy.$api.orderList({state})
   console.log(data)
   data.data.forEach(item => {
    item.timer= item.order_start_time + 7200000 - Date.now()
   });
   order.value = data.data
}

// 點擊事件
const onClickTab =(item) =>{
    getOrderList(item.name)
}

const router = useRouter()
//跳轉訂單詳情
const goDetail=(item)=>{
  router.push(`/detail?oid=${item.out_trade_no}`)
}

const active = ref("")


</script>

<style lang="less" scoped>
  .container {
    background-color: #f0f0f0;
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  
  .header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    margin: 0 !important;
    border: none !important;
  }
  
  .van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    
    .text1 {
      font-size: 16px;
      line-height: 25px;
      font-weight: bold;
    }
    
    .text2 {
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }
  }
  
  .bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999;
  }

  /* 移除標籤頁邊框 */
  ::v-deep(.van-tabs),
  ::v-deep(.van-tabs__wrap),
  ::v-deep(.van-tabs__nav),
  ::v-deep(.van-tab) {
    background-color: #fff !important;
    border: none !important;
    box-shadow: none !important;
  }
  
  ::v-deep(.van-tabs__wrap) {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  ::v-deep(.van-tabs) {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* 確保標題無邊框 */
  .header {
    border: none !important;
    box-shadow: none !important;
    margin-bottom: 0 !important;
  }

</style>