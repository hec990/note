<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }}
        <svg class="icon">
            <use xlink:href="#icon-bottom"></use>
        </svg>
      </span>
      <!--  每一项 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook.id">
          {{ notebook.title }}
        </el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="(note,index) in notes" :key="index">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">3天前</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import Notes from '@/apis/notes'
import NotebookList from "@/apis/notebook";
import Bus from '@/helpers/bus'

export default {
  name: "NoteSidebar",
  data() {
    return {
      // 所有笔记本
      notebooks: [],
      // 所有笔记
      notes: [],
      curBook: {}
    }
  },
  created() {
    // 获取笔记本列表
    NotebookList.getAll()
        .then(res => {
          this.notebooks = res.data
          // 1. 笔记本列表点击过来 ==> notebook.id == this.$route.query.notebookId
          // 2. 直接切换到笔记本详情显示的笔记本 ==> this.notebooks[0]
          this.curBook = this.notebooks.find(notebook => notebook.id === this.$route.query.notebookId)
              || this.notebooks[0] || {}
          return Notes.getAll({notebookId: this.curBook.id})
        }).then(res => {
      this.notes = res.data;
      this.$emit('update:notes', this.notes)
      Bus.$emit('update:notes', this.notes)
    })
  },
  methods: {
    onAddNote() {
      NotebookList.getAll().then(res => {
        if (res.data.length === 0) {
          this.$message.warning({
            message: '请创建至少一个笔记本后再试哦!',
            duration: 2000
          })
        } else {
          this.$prompt('请输入笔记名称', '创建笔记', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^.{1,30}$/,
            inputErrorMessage: '标题不能为空，且不超过30个字符'
          }).then(({value}) => {
            Notes.addNote({notebookId: this.curBook.id}, {title: value})
                .then(res => this.notes.unshift(res.data))
          })
        }
      })
    },
    handleCommand(notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({path: '/trash'})
      }
      // 获取笔记本下所有笔记
      Notes.getAll({notebookId}).then(res => {
        this.notes = res.data;
        this.$emit('update:notes', this.notes)
      })
      this.curBook = this.notebooks.find(notebook => notebook.id === notebookId)
    }
  },

}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
}

.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;
  min-height: 100%;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
    cursor: pointer;

    &:hover {
      color: orange;
    }
  }

  .notebook-title {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    width: 200px;
  }

  .menu {
    display: flex;

    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont {
      font-size: 10px;
    }
  }

  .notes {
    li {
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
        height: 100%;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}

</style>