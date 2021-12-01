import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login";
import NotebookList from "@/components/NotebookList";
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";

Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      redirect: '/login'
    },
    {  // 登录页面
        path: '/login',
        component: Login,
    },
    {  // 笔记本列表页面
        path:'/notebooks',
        component: NotebookList,
    },
    {  // 笔记本详细页面
        path:'/note/:noteId',
        component: NoteDetail,
    },
    {  // 回收站详情页面
        path:'/trash/:noteId',
        component: TrashDetail
    }

]

const router = new VueRouter({
    routes
})

export default router
