<template>
    {{ formater }}
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
  const props = defineProps({
    second: {
      type: Number,
      default: 0,
    },
    format: {
      type: String,
      default: "MM-dd hh:mm",
    },
    sformat: {
      type: String,
      default: "hh:mm:ss",
    },
    suffix: {
      type: String,
      default: "",
    },
  });
  const emit = defineEmits(["counterOver"]);
  // 倒计时显示
  const formater = ref("");
  let intervalId = null; // 保存定时器ID
  
  onMounted(() => {
    formater.value = TIME_FORMAT(props.second);
  });
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  });
  
  // 倒计时逻辑处理
  const TIME_FORMAT = (ts) => {
    let res;
  
    const showtime = () => {
      if (ts <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        emit("counterOver");
        return TIME_SFORMAT(0, props.sformat, props.suffix);
      }
      res = TIME_SFORMAT(ts, props.sformat, props.suffix);
      return res;
    };
    
    // 清除之前的定时器（如果存在）
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    intervalId = setInterval(() => {
      ts -= 1000;
      res = showtime();
      formater.value = res;
    }, 1000);
    return showtime();
  };
  const TIME_FORMIN = (param) => {
    if (param < 0) {
      param = 0;
    }
    if (param < 10) {
      param = "0" + param;
    }
    return param;
  };
  
  const TIME_SFORMAT = (ts, sfmt, suffix) => {
    const time = {
      "h+": TIME_FORMIN(Math.floor((ts / 1000 / 60 / 60) % 24)),
      "m+": TIME_FORMIN(Math.floor((ts / 1000 / 60) % 60)),
      "s+": TIME_FORMIN(Math.floor((ts / 1000) % 60)),
    };
    for (let k in time) {
      if (new RegExp("(" + k + ")").test(sfmt)) {
        sfmt = sfmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? time[k]
            : ("00" + time[k]).substr(("" + time[k]).length)
        );
      }
    }
    return sfmt + suffix;
  };
  </script>
  
  <style></style>
  