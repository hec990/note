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
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link class="notebook" v-for="(notebook,index) in notebooks" :key="index"
                       :to="`/note?notebookId=${notebook.id}`">
            <div class="notebookList">
              <svg class="icon">
                <use xlink:href="#icon-bijiben1"></use>
              </svg>
              <span class="noteTitle">{{ notebook.title }}</span>
              <span class="number">{{ notebook.noteCounts }}</span>
              <span class="action">编辑</span>
              <span class="action" @click.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.updatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import Auth from '@/apis/auth'
import NotebookList from "@/apis/notebook";

// 用于测试API
window.NotebookList = NotebookList;

export default {
  name: "NotebookList",
  data() {
    return {
      notebooks: []
    }
  },
  created() {
    // 未登录状态访问此页强制跳转到登录页
    Auth.getInfo().then(res => {
      if (res.isLogin === false) {
        this.$router.push({path: '/login'})
      }
    })
    // 获取笔记本列表
    NotebookList.getAll().then(res => {
      console.log(res)
      this.notebooks = res.data;
    })
  },
  methods: {
    // 创建笔记
    createNote() {
      let title = window.prompt("请您输入笔记名")
      NotebookList.addNotebook({title}).then(res => {
        this.notebooks.unshift(res.data)
      })
    },
    onDelete(notebook) {
      let isConfirm = window.confirm('你确定要删除吗？')
      if (isConfirm) {
        NotebookList.deleteNotebook(notebook.id)
            .then(() => {
              // NotebookList.getAll().then(res=>{this.notebooks = res.data;})
              this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/NotebookList/NotebookList';
</style>