import Notebook from '../../apis/notebook'
import {Message} from 'element-ui'

const state = {
    notebooks: []
}

const getters = {
    notebooks: state => state.notebooks
}

const mutations = {
    setNotebook(state, payload) {
        state.notebooks = payload.notebooks
    },
    addNotebook(state, payload) {
        state.notebooks.unshift(payload.notebook)
    },
    updateNotebook(state, payload) {
        // TODO || {} 是什么？
        let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
        notebook.title = payload.title
    },
    deleteNotebook(state, payload) {
        state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
    }
}

const actions = {
    getNotebooks({commit}) {
        Notebook.getAll().then(res => {
            commit('setNotebook', {notebooks: res.data})
        })
    },
    addNotebook({commit}, payload) {
        Notebook.addNotebook({title: payload.title}).then(res => {
            commit('addNotebook', {notebook: res.data})
        })
    },
    updateNotebook({commit}, payload) {
        Notebook.updateNotebook(payload.notebookId, {title: payload.title}).then(() => {
            commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
        })
    },
    deleteNotebook({commit}, payload) {
        return Notebook.deleteNotebook(payload.notebookId).then(res => {
            commit('deleteNotebook', {notebookId: payload.notebookId})
            Message.success(res.msg)
        }).catch(err => {
            Message.error(err.msg)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}