import request from '@/helpers/request'
import {formatTime} from "../helpers/formatTime";

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET).then(res => {
                res.data.forEach(notebook => {
                    notebook.createdAtFriendly = formatTime(notebook.createdAt)
                    notebook.updatedAtFriendly = formatTime(notebook.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNotebook(notebookId, {title = ''} = {title: ''}) {
        // URL.UPDATE.replace(':id',notebookId)
        // 把:id 换成我们点击的当前id
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNotebook({title = ''} = {title: ''}) {
        return new Promise((resolve, reject) => {
            request(URL.ADD, 'POST', {title}).then(res => {
                res.data.createdAtFriendly = formatTime(res.data.createdAt)
                res.data.updatedAtFriendly = formatTime(res.data.updatedAt)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}