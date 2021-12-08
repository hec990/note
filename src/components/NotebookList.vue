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
          <router-link class="notebook" v-for="(notebook,index) in this.notebooks" :key="index"
                       :to="`/note?notebookId=${notebook.id}`">
            <div class="notebookList">
              <svg class="icon">
                <use xlink:href="#icon-bijiben1"></use>
              </svg>
              <span class="noteTitle">{{ notebook.title }}</span>
              <span class="number">{{ notebook.noteCounts }}</span>
              <span class="action" @click.prevent="onEdit(notebook)">编辑</span>
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
    createNote() {
      let title = window.prompt('请输入笔记本名称')
      NotebookList.addNotebook({ title }).then(res=>{
        this.notebooks.unshift(res.data)
      })

      // TODO
      // 目前使用Element的组件，点击后会闪退
      // this.$prompt('输入新笔记本标题', '创建笔记本', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPattern: /^.{1,30}$/,
      //   inputErrorMessage: '标题不能为空，且不超过30个字符'
      // }).then(({ value }) => {
      //   return NotebookList.addNotebook({ title: value })
      // }).then(res => {
      //   this.notebooks.unshift(res.data)
      //   this.$message.success(res.msg)
      // })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       NotebookList.deleteNotebook(notebook.id)
            .then(() => {
              this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            })
            .catch(err =>{
              this.$notify.error(err.msg)
            })
      })
    },
    onEdit(notebook){
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        title = value
        return NotebookList.updateNotebook(notebook.id, { title })
      }).then(res => {
        // 新标题赋值旧标题
        notebook.title = title
        this.$notify.success(res.msg)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/NotebookList/NotebookList';
</style>