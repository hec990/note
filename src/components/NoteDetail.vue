<template>
  <div id="note" class="detail">
    <note-sidebar/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span>
            <svg class="icon">
                <use xlink:href="#icon-xianshi"></use>
            </svg>
          <svg class="icon">
            <use xlink:href="#icon-lajitong"></use>
          </svg>
          </span>
        </div>
        <div class="note-title">
          <input type="text"
                 placeholder="输入标题" />
        </div>
        <div class="editor">
          <textarea
              placeholder="输入内容, 支持 markdown 语法">
          </textarea>
          <div class="preview markdown-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from "@/apis/auth";
import NoteSidebar from "@/components/NoteSidebar";

export default {
  name: "NoteDetail",
  components: {NoteSidebar},
  data () {
    return {
      msg: '笔记详情页',
      curNote:{
        id:1,
        createdAtFriendly:"2021年12月11日23:02:45",
        updatedAtFriendly:"2021年12月11日23:12:15"
      },
      statusText:"正在输入中"
    }
  },
  created() {
    console.log(this.$route)
    Auth.getInfo().then(res=>{
      if(res.isLogin === false){
        this.$router.push({path:'/login'})
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height:2em;
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
        &:after {
          content:'';
          display: block;
          clear: both;
        }
        span {
          font-size: 12px;
          color: #999;
          margin-right: 4px;
          &:last-child{
            float: right;
            svg:first-child{
              margin-right: 20px;
            }
          }
        }
      }
      .note-title{
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