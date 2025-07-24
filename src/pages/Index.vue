<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
const route=useRoute();

const {tags}=route.query;
const userList=ref([]);

onMounted(async ()=>{
  // Optionally the request above could also be done as
  const userListData=await myAxios.get('/user/recommend', {
    params: {
      pagenum:1,
      pagesize:10,
    }
  })
      .then(function (response) {
        console.log('/user/recommend succeed',response);
        Toast.success("请求成功");
        console.log(response)
        return response.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);
        Toast.fail("请求失败")
      })
  if(userListData){
    userListData.forEach(user=>{
      if (user.tags) {
        const validJson = user.tags.replace(/'/g, '"');
        try {
          user.tags = JSON.parse(validJson);
        } catch (error) {
          console.error('JSON parse error:', error);
          user.tags = []; // 设置默认值
        }
      }
    })
    userList.value=userListData;
  }

})

</script>

<template>

  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList||userList.length<1 " description="暂无"></van-empty>
</template>

<style scoped>

</style>