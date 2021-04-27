import axios from '../../axios'

export default {
  namespaced: true,
  state() {
    return {
      tasks: [],
      openedTask: {}
    }
  },
  mutations: {
    addNewTask(state, payload) {
      state.tasks.push(payload)
    },
    loadTasks(state, payload) {
      const tasks = Object.keys(payload).reduce((tasks, key) => {
        return [...tasks, {...payload[key], id:key}]
      }, [])
      state.tasks = tasks
    },
    loadTaskById(state, payload) {
      state.openedTask = payload
    },
    changeStatus(state, status) {
      state.openedTask = {...state.openedTask, status}
    }
  },
  actions: {
    async fetchTaskById({commit}, id) {
      try {
        const response = await axios.get(`/tasks/${id}.json`)
        commit('loadTaskById', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchAllTasks({commit}) {
      try {
        const response = await axios.get('tasks.json')
        commit('loadTasks', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async createTask({commit}, payload) {
      try {
        const response = await axios.post('tasks.json', payload)
        payload.id = response.data.name
        commit('addNewTask', payload)
      } catch (e) {
        console.log(e)
      }
    },
    async changeTaskStatus({commit}, payload) {
      try {
        const response = await axios.patch(`/tasks/${payload.id}.json`, payload.status)
        commit('changeStatus', response.data.status)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    activeTasks(state, getters) {
      return  getters.tasks.filter(task => task.status === 'active').length
    },
    openedTask(state) {
      return state.openedTask
    }
  }
}
