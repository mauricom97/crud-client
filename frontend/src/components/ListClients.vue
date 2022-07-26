<template>
  <div id="listClients">

    <div id="inputSearch">
      <tr>
        <td class="text-left">
          <q-input outlined v-model="valueInputSearchClients"
            label="Search Name, Email or CPF" />
        </td>
        <td class="text-right" id="createButtom">
          <q-btn color="white" text-color="black" label="Create client" />
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

            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary">View</q-btn>
            <q-btn color="secondary">Edit</q-btn>
            <q-btn color="red">Delete</q-btn>
          </q-card-actions>
        </q-card>

      </q-list>



    </q-scroll-area>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      clients: new Array(),
      valueInputSearchClients: ''
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

  computed: {
    filteredClients: function () {
      return this.clients.filter((client) => {
        return client.name.toUpperCase().match(this.valueInputSearchClients.toUpperCase()) || client.email.toUpperCase().match(this.valueInputSearchClients.toUpperCase())
      })
    }
  }
}
</script>



<style scoped>
#listClients {
  height: 60%;
  width: 70%;
  position: absolute;
  margin: 15%;
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