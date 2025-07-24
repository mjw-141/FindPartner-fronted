<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {ref} from "vue";


const route = useRoute();
const router = useRouter();

const editUser=ref({
  editKey:route.query.editKey,
  editName:route.query.editName,
  currentValue:route.query.currentValue,
})

const onSubmit = async() => {
  const currentUser=await getCurrentUser();
  if(!currentUser){
    Toast.fail("请先登录");
    return;
  }
  // 构造要提交的字段值
  let submitValue = editUser.value.currentValue;

  // 如果是性别字段，进行映射转换
  if (editUser.value.editKey === 'gender') {
    if (submitValue === '男') {
      editUser.value.currentValue = 0;
    } else if (submitValue === '女') {
      editUser.value.currentValue = 1;
    } else {
      submitValue = null; // 或者默认值
    }
  }
  console.log(currentUser,'当前用户');
  const res=await myAxios.post('/user/update',{
    "id":currentUser.id,
    [editUser.value.editKey]:editUser.value.currentValue,//键值对动态获取
  })

  console.log(res,'修改用户信息');

  if(res.code===0&&res.data>0){
    Toast.success("修改成功");
    router.back();
  }else{
    Toast.fail("修改失败");
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="'请输入' + editUser.editName"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>