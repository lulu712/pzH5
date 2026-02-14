<template>
    <div class="container">
      <div class="header">
        <van-icon @click="goBack" name="arrow-left" class="header-left" size="30"/>
        訂單詳情  
      </div>
        <status-bar :item="stateMap[detailData.trade_state]"/>
        <div class="tips">
          <div class="dzf" v-if="detailData.trade_state === '待支付'">
            <div class="text1">訂單待支付</div>
            <div class="text2">
              請在<counter :second="second"/>分鐘內完成支付，逾期訂單將自動取消
            </div>
            <div class="text3">
                <van-button type="success" @click="showCode = true">立即支付（10元）</van-button>
            </div>
          </div>
        </div>
        <!-- 二維碼支付彈窗 -->
        <van-dialog :show-Confirm-Button="false" v-model:show="showCode" >
            <van-icon name="cross" class="close" @click="closeCode"/>
            <div>微信支付</div>
            <van-image width="150p" height="150" :src="codeImg"/>
            <div>請使用本人微信掃描Qrcode</div>
        </van-dialog>
    </div>
</template>

<script setup>
import{ useRouter ,useRoute } from 'vue-router';
import statusBar from '../../components/statusBar.vue';
import { ref,getCurrentInstance,onMounted, reactive,computed} from 'vue';
import counter from '../../components/counter.vue';
import QrCode from 'qrcode'

const router = useRouter()
//拿到當前路由對象
const route = useRoute()



//獲取當前Vue實例
const { proxy } = getCurrentInstance()



//倒數計時器數據
const second = computed(()=>{
  return detailData.order_start_time ? detailData.order_start_time + 7200000 - Date.now() : 0
})

//二維碼支付彈窗數據
const showCode = ref(false)
const codeImg = ref('')
//支付關閉
const closeCode =()=>{
    showCode.value =false
    router.push('/order')
}

//狀態欄數據
const stateMap={
  '待支付':10,
  '待服务':20,
  '已完成':30,
  '已取消':40,
}

//詳情頁數據
const detailData = reactive({})

onMounted(async()=>{
  const {data}= await proxy.$api.orderDetail({oid:route.query.oid})
  Object.assign(detailData,data.data)
   QrCode.toDataURL(orderRes.data.wx_code).then((url)=>{
         showCode.value = true
         codeImg.value = url
    })
  console.log(detailData,'詳情頁數據')
})


//點擊返回
const goBack = () => {
  router.go(-1)
}



</script>

<style scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
  }
  .header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
    .header-left {
      float: left;
    }
  }
  .card {
    margin: 15px 0;
    padding: 10px;
    .header-text {
      padding-left: 5px;
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      border-left: 4px solid red;
    }
  }
  .dzf {
    padding: 20px;
    .text1 {
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      color: #666;
    }
    .text2 {
      font-size: 14px;
      color: #666;
    }
    .text3 {
      text-align: center;
      .van-button {
        margin-top: 10px;
        margin-left: 10px;
        width: 80%;
        font-weight: bold;
      }
    }
  }
  ::v-deep(.van-dialog__content) {
    text-align: center;
    padding: 20px;
    .close {
      position: absolute;
      left: 20px;
    }
  }

</style>