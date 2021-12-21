<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择一个笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAt }}</span>
          <span> 更新日期: {{ curNote.updatedAt }}</span>
          <span> {{ statusText }}</span>
          <span>
            <span>当前显示：{{ text }}</span>
            <svg class="icon" @click="isShowView">
                <use xlink:href="#icon-xianshi"></use>
            </svg>
          <svg class="icon" @click="removeNote">
            <use xlink:href="#icon-lajitong"></use>
          </svg>
          </span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model="curNote.title"
                 @input="updateNote"
                 @keydown="statusText='正在输入...'"
                 placeholder="输入标题"/>
        </div>
        <div class="editor">
          <textarea
              v-show="!isShowPreview"
              v-model="curNote.content"
              @input="updateNote"
              @keydown="statusText='正在输入...'"
              placeholder="输入内容, 支持 markdown 语法">
          </textarea>
          <div class="preview markdown-body"
               v-html="previewContent"
               v-show="isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from '../apis/auth';
import NoteSidebar from "../components/NoteSidebar";
import _ from 'lodash';
import Notes from '../apis/notes'
import Bus from '../helpers/bus'
import MarkdownIt from 'markdown-it'

let md = new MarkdownIt()

export default {
  name: "NoteDetail",
  components: {NoteSidebar},
  data() {
    return {
      msg: '笔记详情页',
      curNote: {},
      statusText:'笔记未改动',
      notes: [],
      isShowPreview:false,
      text: 'MarkDown',
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (res.isLogin === false) {
        this.$router.push({path: '/login'})
      }
    })
    Bus.$once('update:notes', val => {
      this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
    })
  },
  methods: {
    // 节流:用户停下的时候立马保存
    updateNote: _.debounce(function() {
      Notes.updateNote({ noteId: this.curNote.id },
          { title: this.curNote.title, content: this.curNote.content })
          .then(() => {
            this.statusText = '已保存'
          }).catch(() => {
        this.statusText = '保存出错'
      })
    }, 300),
    removeNote(){
      Notes.deleteNote({noteId:this.curNote.id}).then((data)=>{
        this.$message.error(data.msg)
        this.notes = this.notes.splice(this.notes.indexOf(this.curNote),1)
      })
    },
    isShowView(){
      this.isShowPreview = !this.isShowPreview;
      this.isShowPreview ? this.text = 'HTML' : this.text = 'MarkDown'
    }
  },
  computed:{
    previewContent() {
      return md.render(this.curNote.content||'')
    }
  },
  // 组件内路由发生变化时触发
  beforeRouteUpdate(to, from, next) {
    this.curNote = this.notes.find(note => note.id == to.query.noteId)
    next()
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height: 2em;
}

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-detail {
    flex: 1;
    display: flex;
    flex-direction: column;

    .note-empty {
      font-size: 50px;
      color: #ccc;
      text-align: center;
      margin-top: 100px;
    }

    .note-detail-ct {
      height: 100%;

      .note-bar {
        padding: 4px 20px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        &:after {
          content: '';
          display: block;
          clear: both;
        }

        span {
          font-size: 12px;
          color: #999;
          margin-right: 4px;

          &:last-child {
            display: flex;
            flex-direction: row;
            align-items: center;
            float: right;
            span {
              margin-right: 10px;
            }
            svg:last-child {
              margin-left: 6px;
            }
          }
        }
      }

      .note-title {
        input {
          display: inline-block;
          width: 100%;
          border: none;
          outline: none;
          font-size: 18px;
          padding: 10px 20px;
        }
      }

      .editor {
        height: calc(100% - 70px);
        position: relative;

        textarea, .preview {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 20px;
        }

        textarea {
          border: none;
          resize: none;
          outline: none;
          font-size: 14px;
          font-family: 'Monaco', courier, monospace;
        }
      }
    }
  }
}
</style>