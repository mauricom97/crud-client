<template>
  <div>
    <ListClients/>
  </div>
</template>

<script>
import { ref } from 'vue'
import ListClients from './components/ListClients.vue'

export default {
  name: 'LayoutDefault',

  components: {
    ListClients
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>