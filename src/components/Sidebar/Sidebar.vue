<template>
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note/1" title="笔记">
          <svg class="icon">
            <use xlink:href="#icon-biji"></use>
          </svg>
         <span>笔记本详情</span>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon">
          <use xlink:href="#icon-bijiben"></use>
        </svg>
        <span>笔记本列表</span>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <svg class="icon">
          <use xlink:href="#icon-huishouzhan"></use>
        </svg>
        <span>&ensp;回收站&ensp;&ensp;&ensp;</span>
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <svg class="icon">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script lang="js">
import Avatar from "@/components/Sidebar/Avatar";
import Auth from '@/apis/auth'

export default {
  name: "Sidebar",
  methods:{
    logout(){
      Auth.logout().then(res =>{
        this.$router.push({path:'/login'})
        console.log(res)
      })
    }
  },
  components: {Avatar}
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#sidebar {
  position: relative;
  width: 180px;
  text-align: center;
  background-color: #222530;
  .icons {
    margin-top: 15px;
    a {
      padding: 12px 0;
      display: block;
      span {
        color:#C0D2EB;
        font-size: 12px;
        margin-left: 14px;
      }
    }
    .router-link-active {
      border-radius: 12px;
      background-color: #414b5f;
    }
  }
  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    span {
      color:#C0D2EB;
      font-size: 12px;
      margin-left: 14px;
    }
  }
}
</style>