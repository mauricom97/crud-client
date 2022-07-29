<template>
  <div>
    <ListClients v-if="auxListClients"
     @createClient="ModalCreateClient"
     @refreshListClients="refreshClients"
    />
    <CreateClient v-if="modalCreateClient" @createClient="ModalCreateClient" id="compModalCreateClient"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import ListClients from './components/ListClients.vue'
import CreateClient from './components/CreateClient.vue'

export default {
  name: 'LayoutDefault',

  components: {
    ListClients,
    CreateClient
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  },

  data() {
    return {
      modalCreateClient: false,
      auxListClients: true
    }
  },

  methods: {
    ModalCreateClient(e) {
      console.log(e)
      this.modalCreateClient = e
    },
    refreshClients() {
      this.auxListClients = false
      this.auxListClients = true
    }
  }
}
</script>

<style>
</style>