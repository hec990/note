<template>
  <div>
    <span :title="username">{{ slug }}</span>
  </div>
</template>

<script lang="js">
import Bus from '@/helpers/component-Bus'

export default {
  name: "Avatar",
  data() {
    return {
      username: "未登录"
    }
  },
  created() {
    // 展示登录成功后最新的username
    Bus.$on('userInfo',user=>{
      this.username = user.username;
    })
    // 注销后显示的名字
    Bus.$on('logout_userInfo',user=>{
      this.username = user.logout_userInfo;
    })
  },
  computed:{
    slug(){
      return this.username.charAt(0)
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>