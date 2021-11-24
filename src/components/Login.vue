<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister()">创建账户</h3>
            <transition name="slide">
            <div v-bind:class="{show: isShowRegister}" class="register">
              <input type="text" placeholder="用户名">
              <input type="password" placeholder="密码">
              <div class="button">创建账号</div>
            </div>
            </transition>
            <h3 @click="showLogin()">登录</h3>
            <transition name="slide">
            <div v-bind:class="{show: isShowLogin}" class="login">
              <input type="text" placeholder="输入用户名">
              <input type="password" placeholder="密码">
              <div class="button"> 登录</div>
            </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "Login",
  data() {
    return {
      // 是否显示注册账户
      isShowRegister: false,
      // 是否显示登录
      isShowLogin: true,
    }
  },
  methods: {
    showRegister() {
      this.isShowRegister = true;
      this.isShowLogin = false;
    },
    showLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./src/assets/style/Login/Login.scss";
</style>