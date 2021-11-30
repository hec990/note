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
                <input type="text" v-model="register.username" @keyup.enter="onRegister" placeholder="用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
                <p v-bind:class="{error: register.isError}"> {{ register.notice }}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>
            <h3 @click="showLogin()">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" @keyup.enter="onLogin" placeholder="输入用户名" >
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码" >
                <p v-bind:class="{error: login.isError}"> {{ login.notice }}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from '@/apis/auth'
import Bus from '@/helpers/component-Bus'

export default {
  name: "Login",
  data() {
    return {
      // 是否显示注册账户
      isShowRegister: false,
      // 是否显示登录
      isShowLogin: true,
      register: {
        username: '',
        password: '',
        notice: "创建账号后，请记住用户名和密码",
        isError: false
      },
      login: {
        username: '',
        password: '',
        notice: "输入用户名和密码",
        isError: false
      }
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
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }
      this.register.isError = false
      this.register.notice = ''

      Auth.register({
        username:this.register.username,
        password:this.register.password
      }).then(res =>{
        console.log(res);
        Bus.$emit('userInfo',{username:this.register.username})
        this.$router.push({path: 'notebooks'})
      })
    },
    onLogin(){
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.login.isError = false
      this.login.notice = ''

      Auth.login({
        username:this.login.username,
        password:this.login.password
      }).then(res=>{
        Bus.$emit('userInfo',{username:this.login.username})
        this.$router.push({path: 'notebooks'})
        console.log(res);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./src/assets/style/Login/Login.scss";
</style>