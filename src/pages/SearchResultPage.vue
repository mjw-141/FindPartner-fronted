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
  const userListData=await myAxios.get('/user/search/tags', {
    params: {
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed',response);
    Toast.success("请求成功");
    console.log(response)
    return response.data;
  })
  .catch(function (error) {
    console.log('/user/search/tags error',error);
    Toast.fail("请求失败")
  })
  if(userListData){
    userListData.forEach(user=>{
      if (user.tags){
        user.tags=JSON.parse(user.tags);
      }
    })
    userList.value=userListData;
  }

})

// const mockUser={
//   id: 123456,
//   username: '毛皮',
//   userAccount:'maopi' ,
//   avatarUrl: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.OUpaDpZDdqpJb6A9j61KywAAAA?w=80&h=80&c=1&bgcl=a6ee63&r=0&o=6&dpr=1.5&pid=ImgRC',
//   profile:'一名精神小伙，目前还有头发，乐观开朗，阿八八八八八',
//   gender:0,
//   phone: '16634276638',
//   email: 'mao@qq.com',
//   userRole: 0,
//   planetCode: '123445',
//   tags:['java','emo','打工中'],
//   createTime: new Date(),
// }
//


</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList||userList.length<1 " description="暂无"></van-empty>


</template>

<style scoped>

</style>