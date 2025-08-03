<script setup lang="ts">
import type {TeamType} from "../models/team";
import  {teamStatusEnum}  from "../constants/team.ts"
import ikun from "../assets/ikun.png"
import {Toast} from "vant";
import myAxios from "../plugins/myAxios.ts";

import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";


interface TeamCardListProps{
  teamList: TeamType[];
}

const props=withDefaults(defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList:[] as TeamType[],
});

const currentUser=ref();
const router=useRouter();

onMounted(async()=>{
  currentUser.value=await getCurrentUser();
})


/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', { teamId: id });
  if (res?.code === 0) {
    Toast.success('加入成功'); // 修正：直接传递字符串，不需要对象形式
  } else {
    Toast.fail('加入失败' + (res.description ? ` ${res.description}` : ''));
  }
}

//更新队伍 url params传递方式
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id: id,
    },
  });
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', { id });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail(`操作失败${res.description ? `, ${res.description}` : ''}`);
  }
};

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', { teamId: id });
  if (res?.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail(`操作失败${res.description ? `, ${res.description}` : ''}`);
  }
};


</script>

<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="ikun"
      :desc="team.description"
      :title="`${team.name}`"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
        {{teamStatusEnum[team.status]}}
      </van-tag>
    </template>

    <template #bottom>
      <div>
        {{ '最大人数：' + team.maxNum }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间：' + team.expireTime }}
      </div>
      <div>
        {{ '创建时间：' + team.createTime }}
      </div>
    </template>

    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      <van-button size="small" plain @click="doUpdateTeam(team.id)">更新队伍</van-button>
      <van-button size="small" plain @click="doQuitTeam(team.id)">退出队伍</van-button>
      <van-button v-if="team.userId===currentUser?.id" size="small" plain @click="doDeleteTeam(team.id)">解散队伍</van-button>
      <div v-if="team.expireTime">
        {{ currentUser?.id }}
      </div>
    </template>
  </van-card>
</template>

<style scoped>

</style>