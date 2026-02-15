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
            <div class="dzf" v-if="detailData.trade_state === '待服务'">
              <div class="text1">正在為您安排服務專員...</div>
              <div class="text2">請保持手機暢通，稍後將會有專人與您聯繫</div>
            </div>
            <div class="dzf" v-if="detailData.trade_state === '已完成'">
              <div class="text1">服務已完成...</div>
              <div class="text2">感謝您的使用，如有問題請洽客服</div>
            </div>
            <div class="dzf" v-if="detailData.trade_state === '已取消'">
              <div class="text1">訂單已取消</div>
              <div class="text2">期待下次為您服務，有任何需求歡迎洽詢客服</div>
            </div>
          </div>
        </div>

        <van-cell-group class="card">
          <div class="header-text">預約詳情</div>
          <van-cell 
              v-for="(item,key) in makeInfo"
              :key="key"
              :title="item"
              :value="formatData(key)"
          />
        </van-cell-group>
        <van-cell-group class="card">
          <div class="header-text">訂單訊息</div>
          <van-cell 
              v-for="(item,key) in orderInfo"
              :key="key"
              :title="item"
              :value="formatData(key)"
          />
        </van-cell-group>

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

//訂單詳情
const makeInfo={
    service_name:'預約服務',
    hospital_name:'就診醫院',
    starttime:'期望就診時間',
    'client.name' :'就診人姓名',
    'client.mobile':'就診人電話',
    receiveAddress : '接送地址',
    demand:'其他備註'
}

const orderInfo={
    tel : '就診人電話',
    order_start_time : '下單時間',
    price : '應付金額',
    out_trade_no : '訂單編號'
}

const formatData = (key) => {
  if (key.indexOf(".") === -1) {
    if (key === "order_start_time") {
      return formatTimestamp(detailData[key]);
    }
    return detailData[key];
  }
  let arr = key.split(".").reduce((o, p) => {
    return (o || {})[p];
  }, detailData);
  return arr;
}
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}



//詳情頁數據
const detailData = reactive({})


onMounted(async()=>{
  const {data}= await proxy.$api.orderDetail({oid:route.query.oid})
  Object.assign(detailData,data.data)
   QrCode.toDataURL(data.data.code_url).then((url)=>{
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