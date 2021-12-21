<template>
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
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
      <router-link to="/trash" title="回收站">
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
import Bus from '@/helpers/component-Bus'

export default {
  name: "Sidebar",
  methods:{
    logout(){
      Auth.logout().then(res =>{
        this.$router.push({path:'/login'})
        this.$notify.success({
          title:res.msg
        });
      })
      //  注销登录后的名字显示
      Bus.$emit("logout_userInfo",{logout_userInfo:"未"})
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