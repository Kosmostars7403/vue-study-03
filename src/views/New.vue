<template>
  <form class="card" @submit.prevent="submitHandler">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!formValid">Создать</button>
  </form>
</template>


<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import  {useRouter} from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const date = ref('')
    const description = ref('')
    const store = useStore()
    const router = useRouter()

    function submitHandler() {
      const task = {
        title: title.value,
        deadline: date.value,
        description: description.value,
        status: new Date() < new Date(date.value) ? 'active' : 'cancelled'
      }

      store.dispatch('tasks/createTask', task)
      title.value = date.value = description.value = ''
      router.push('/')
    }

    const formValid = computed(() => {
      return title.value.trim() !== '' && date.value && description.value.trim() !== ''
    })

    return {
      title, date, description, submitHandler, formValid
    }
  },
}
</script>
