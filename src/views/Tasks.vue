<template>
  <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status"/>
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date(task.deadline).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <router-link :to="'/task/' + task.id">
        <button class="btn primary">Посмотреть</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {mapGetters, useStore} from 'vuex'

export default {
  components: {AppStatus},
  setup() {
    const store = useStore()
    store.dispatch('tasks/fetchAllTasks')
    return {}
  },
  computed: mapGetters('tasks',['tasks', 'activeTasks'])
}
</script>
