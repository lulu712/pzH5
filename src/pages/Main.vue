<template>

    <RouterView />
    <van-tabbar v-model="active">
        <van-tabbar-item 
            v-for="item in router.options.routes[0].children" 
            :key="item.path" 
            :icon="item.meta.icon"
            :url="`#/${item.path}`"{{ item.meta }} 
            >
        </van-tabbar-item>
    </van-tabbar>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import { useRoute,useRouter} from 'vue-router';

const active = ref(0);
const router = useRouter();
const route=useRoute();

onMounted(() => {
    console.log(router,'router')
    //根據當前路由讀取當前路由在路由表中的位置
    const data = router.options.routes[0]
    active.value = data.children.findIndex(item =>'/' + item.path === item.path === route.path)
})

</script>