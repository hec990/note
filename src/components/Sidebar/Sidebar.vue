<template>
  <div id="sidebar" :class="[{'afterShrinkingSidebarWidth':isShrink}]">
    <Avatar/>
    <div class="shrink" @click="collapse" :class="[{'afterShrinkingRevolve':isShrink}]">
      <svg class="icon">
        <use xlink:href="#icon-left"></use>
      </svg>
    </div>
    <div class="icons">
      <router-link to="/note" title="笔记">
          <svg class="icon">
            <use xlink:href="#icon-biji"></use>
          </svg>
         <span v-show="isUnfold">笔记本详情</span>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <svg class="icon">
          <use xlink:href="#icon-bijiben"></use>
        </svg>
        <span v-show="isUnfold">笔记本列表</span>
      </router-link>
      <router-link to="/trash" title="回收站">
        <svg class="icon">
          <use xlink:href="#icon-huishouzhan"></use>
        </svg>
        <span v-show="isUnfold">&ensp;回收站&ensp;&ensp;&ensp;</span>
      </router-link>
    </div>
    <div class="logout" @click="logout">
      <svg class="icon">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
      <span v-show="isUnfold">退出登录</span>
    </div>
  </div>
</template>

<script lang="js">
import Avatar from "@/components/Sidebar/Avatar";
import Auth from '@/apis/auth'
import Bus from '@/helpers/component-Bus'

export default {
  name: "Sidebar",
  data(){
    return {
      // 是否展开
      isUnfold: true,
      // 是否收缩
      isShrink: false
    }
  },
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
    },
    collapse(){
      this.isUnfold = !this.isUnfold;
      this.isShrink = !this.isShrink;
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

// 收缩后侧边栏宽度
.afterShrinkingSidebarWidth {
  width: 55px !important;
  transition: width 2s;

}
// 收缩后图标旋转
.afterShrinkingRevolve {
  transform: rotate(-180deg);
}

#sidebar {
  position: relative;
  width: 180px;
  text-align: center;
  background-color: #222530;

  .shrink {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    background-color: #f7f7fa;
    font-size: 14px;
    position: absolute;
    top: 10px;
    right: -12px;
    border-radius: 50%;
    z-index: 10;
    &:hover {
      background-color: #e0e0e0;
      cursor: pointer;
    }
  }
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