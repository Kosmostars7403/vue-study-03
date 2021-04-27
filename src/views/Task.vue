<template>
  <div class="card" v-if="openedTask">
    <h2>{{ openedTask.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="openedTask.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(openedTask.deadline).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ openedTask.description }}</p>
    <div>
      <button class="btn" @click="changeTaskStatus({id, status:{status: 'pending'}})">Взять в работу</button>
      <button class="btn primary" @click="changeTaskStatus({id, status:{status: 'done'}})">Завершить</button>
      <button class="btn danger" @click="changeTaskStatus({id, status:{status: 'cancelled'}})">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute} from 'vue-router'
import {useStore, mapGetters, mapActions} from 'vuex'

export default {
  components: {AppStatus},
  setup() {
    const route = useRoute()
    const store = useStore()
    const id = route.params.id

    store.dispatch('tasks/fetchTaskById', id)

    return {id}
  },
  computed: mapGetters('tasks', ['openedTask']),
  methods: mapActions('tasks', ['changeTaskStatus'])
}
</script>

<style scoped>

</style>
