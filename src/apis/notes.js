import request from '@/helpers/request'

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId',
}

export default {
    // 获取所有笔记本
    getAll({notebookId}) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId))
                .then(res => {
                    resolve(res)
                }).catch(err => {
                reject(err)
            })
        })
    },
    // 修改笔记，告诉我要修改笔记的Id，title 和 content
    updateNote({noteId}, {title, content}) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
    },
    // 删除笔记，告诉我删除哪个笔记Id
    deleteNote({noteId}) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    // 添加笔记，告诉我添加到哪个笔记本下，以及title和content是什么
    addNote({ notebookId },  {title = '', content = ''} = {title: '', content: ''}) {
        return request(URL.ADD.replace(':notebookId',notebookId), 'POST', {title, content})
    }
}