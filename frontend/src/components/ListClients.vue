<template>
  <div id="listClients">
    <div id="inputSearch">
      <tr>
        <td class="text-left">
          <q-input outlined v-model="valueInputSearchClients" label="Search Name, Email or CPF" />
        </td>
        <td class="text-right" id="createButtom">
          <q-btn color="white" text-color="black" label="Create client" @click="openModalCreateClient()" />
        </td>
      </tr>

    </div>

    <q-scroll-area style="height: 80%; width: 100%;">

      <q-list v-for="client in filteredClients" :key="client._id" id="cards">
        <q-card class="my-card">
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="person" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ client.name }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon color="red" name="email" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ client.email }}</q-item-label>

                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon color="red" name="edit" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ client.cpf }}</q-item-label>

                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary">View</q-btn>
            <q-btn color="secondary">Edit</q-btn>
            <q-btn color="red" @click="openModalDeleteClient(client._id)">Delete</q-btn>
          </q-card-actions>
        </q-card>

      </q-list>
    </q-scroll-area>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm">You Do you want to delete the client {{ clientName }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete client" @click="deleteClient()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    createClient: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      clients: new Array(),
      valueInputSearchClients: '',
      confirmDelete: false,
      client: new Object()
    }
  },
  created() {
    axios.get('http://localhost:3000/clients')
      .then(response => {
        this.clients = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    openModalDeleteClient(id) {
      this.client.id = id
      this.confirmDelete = true
    },

    openModalCreateClient() {
      this.$emit('createClient', true)
    },

    deleteClient() {
      axios.delete('http://localhost:3000/clients/' + this.client.id)
        .then(response => {
          this.clients = this.clients.filter(client => client._id !== this.client.id)
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

  },

  computed: {
    filteredClients: function () {
      return this.clients.filter((client) => {
        return client.name.toUpperCase().match(this.valueInputSearchClients.toUpperCase()) || client.email.toUpperCase().match(this.valueInputSearchClients.toUpperCase()) || client.cpf.toUpperCase().match(this.valueInputSearchClients.toUpperCase())
      })
    }
  }
}
</script>



<style scoped>
#listClients {
  height: 80%;
  width: 70%;
  position: absolute;
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 15%;
  background-color: rgb(93, 224, 76);
  border-radius: 15px;
}

#cards {
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
}

#inputSearch {
  width: 95%;
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 1%;
}

#createButtom {
  background-color: slateblue;
  position: absolute;
  right: 2%;
}
</style>