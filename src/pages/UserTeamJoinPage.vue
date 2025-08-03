<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import {Toast} from "vant";
import myAxios from "../plugins/myAxios.ts";
const router = useRouter();

//跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  });
}

const teamList = ref([]);
const searchText = ref("");

/**
 * 搜索队伍
 * @param val
 */
const listTeam= async (val='')=>{
  const res = await myAxios.get("/team/list/my/join",{
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
}
// 页面加载时只触发一次
onMounted(() => {
  listTeam();
})
const onSearch=(val) => {
  listTeam(val);
}

</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="请输入搜索队伍" @search="onSearch"/>
    <team-card-list :teamList="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>