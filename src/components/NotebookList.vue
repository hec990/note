<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(1)</h3>
        <div class="book-list">
          <router-link class="notebook" to="/1">
            <div class="notebookList">
                <svg class="icon">
                  <use xlink:href="#icon-bijiben1"></use>
                </svg>
              <span class="noteTitle">前端笔记</span>
              <span class="number">1</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </router-link>
          <router-link class="notebook" to="/1">
            <div class="notebookList">
              <svg class="icon">
                <use xlink:href="#icon-bijiben1"></use>
              </svg>
              <span class="noteTitle">前端笔记</span>
              <span class="number">1</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </router-link>
          <router-link class="notebook" to="/1">
            <div class="notebookList">
              <svg class="icon">
                <use xlink:href="#icon-bijiben1"></use>
              </svg>
              <span class="noteTitle">前端笔记</span>
              <span class="number">1</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </router-link>
          <router-link class="notebook" to="/1">
            <div class="notebookList">
              <svg class="icon">
                <use xlink:href="#icon-bijiben1"></use>
              </svg>
              <span class="noteTitle">前端笔记</span>
              <span class="number">1</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import Auth from '@/apis/auth'

export default {
  name: "NotebookList",
  data(){
    return {}
  },
  created() {
    Auth.getInfo().then(res=>{
      if(res.isLogin === false){
        this.$router.push({path:'/login'})
      }
    })
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/NotebookList/NotebookList';
</style>