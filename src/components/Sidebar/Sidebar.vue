<template>
  <div id="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <svg class="icon">
          <use xlink:href="#icon-biji"></use>
        </svg>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon">
          <use xlink:href="#icon-bijiben"></use>
        </svg>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <svg class="icon">
          <use xlink:href="#icon-huishouzhan"></use>
        </svg>
      </router-link>
    </div>
    <div class="logout">
      <svg class="icon" @click="logout">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
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
  width: 56px;
  text-align: center;
  background-color: #2c333c;
  .icons {
    margin-top: 15px;
    a {
      padding: 6px 0;
      display: block;
    }
    .router-link-active {
      background-color: #5e6266;
    }
  }
  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}
</style>