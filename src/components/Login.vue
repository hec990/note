<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3>创建账户</h3>
            <div v-show="true" class="register">
              <input type="text" placeholder="用户名">
              <input type="password" placeholder="密码">
              <div class="button">创建账号</div>
            </div>
            <h3>登录</h3>
            <div v-show="false" class="login">
              <input type="text" placeholder="输入用户名">
              <input type="password" placeholder="密码">
              <div class="button"> 登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "Login"
};
</script>

<style lang="scss" scoped>
@import "./src/assets/style/Login/Login.scss";
</style>