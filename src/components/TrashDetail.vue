<template>
  <div id="trash" class="detail">
    <div class="trash-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note,index) in trashNotes" :key="index">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="trash-detail">
      <div class="trash-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <a class="action" @click="onRevert">恢复</a>
        <a class="action" @click="onDelete">彻底删除</a>
      </div>
      <div class="trash-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from "@/apis/auth";
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt()

export default {
  name: "TrashDetail",
  data() {
    return {
      trashNotes: [
        {
          id: 6,
          title: "我的笔记2",
          content: "## hello",
          createdAtFriendly: "1小时前",
          updatedAtFriendly: "刚刚"
        }, {
          id: 3,
          title: "我的笔记3",
          content: "## hello",
          createdAtFriendly: "1小时前",
          updatedAtFriendly: "刚刚"
        }
      ],
      curTrashNote: {
        id: 3,
        title: "我的笔记3",
        content: "## hello",
        createdAtFriendly: "1小时前",
        updatedAtFriendly: "刚刚"
      },
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (res.isLogin === false) {
        this.$router.push({path: '/login'})
      }
    })
  },
  methods: {
    onRevert() {
      console.log('恢复')
    },
    onDelete(notebook) {
      console.log(notebook,'delete')
    }
  },
  computed:{
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "")
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/TrashDetail/TrashDetail";
</style>