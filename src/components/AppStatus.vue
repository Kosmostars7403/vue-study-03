<template>
  <span class="badge" :class="status.class">{{ status.name }}</span>
</template>

<script>
import {reactive, watch} from 'vue'

export default {
  props: {
    type: {
      type: String,
      validator(value) {
        return ['active', 'done', 'pending', 'cancelled'].includes(value)
      }
    }
  },
  setup(props) {
    const status = reactive({})

    const classesMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning'
    }

    const nameMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется'
    }

    status.class = classesMap[props.type]
    status.name = nameMap[props.type]

    watch(props, () => {
      status.class = classesMap[props.type]
      status.name = nameMap[props.type]
    })

    return {
      status
    }
  }
}
</script>
