<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="createNote">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link class="notebook" v-for="(notebook,index) in notebooks" :key="index" :to="`/note?notebookId=${notebook.id}`">
            <div class="notebookList">
                <svg class="icon">
                  <use xlink:href="#icon-bijiben1"></use>
                </svg>
              <span class="noteTitle">{{ notebook.title }}</span>
              <span class="number">{{notebook.noteCounts}}</span>
              <span class="action">编辑</span>
              <span class="action" >删除</span>
              <span class="date">{{notebook.updatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import Auth from '@/apis/auth'
import request from '@/helpers/request'

export default {
  name: "NotebookList",
  data(){
    return {
      notebooks:[]
    }
  },
  created() {
    // 未登录状态访问此页强制跳转到登录页
    Auth.getInfo().then(res=>{
      if(res.isLogin === false){
        this.$router.push({path:'/login'})
      }
    })
    request('/notebooks').then(res=>{
      console.log(res)
      this.notebooks = res.data;
    })
  },
  methods:{
    // 创建笔记
    createNote(){
      let title = window.prompt("请您输入笔记名")
      request('/notebooks','POST',{title}).then(res=>{
        console.log(res)
        this.notebooks.unshift(res.data)
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/NotebookList/NotebookList';
</style>