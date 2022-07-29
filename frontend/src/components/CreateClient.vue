<template>
    <q-dialog v-model="modalCreateClient" persistent>
        <q-card style="width: 80%;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Sign up</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeModalCreateClient()" />
            </q-card-section>

            <q-card-section>
                <q-input class="inputFormCreateClient" outlined v-model="newClientName" label="Full name" />
                <q-input class="inputFormCreateClient" mask="##/##/####" outlined v-model="newClientbirthDate"
                    label="Birth date" />
                <q-input class="inputFormCreateClient" type="email" outlined v-model="newClientEmail" label="E-mail" />
                <q-input class="inputFormCreateClient" mask="###.###.###-##" outlined v-model="newClientCpf"
                    label="CPF" />
                <q-input class="inputFormCreateClient" mask="(##) #####-####" outlined v-model="newClientPhone"
                    label="Phone" />
                <q-input class="inputFormCreateClient" mask="#####-###" v-on:keyup="getCep()" outlined
                    v-model="newClientCep" label="Insert the CEP for autocomplete" />
                <q-input class="inputFormCreateClient" outlined v-model="newClientAdress" label="Address" />
                <q-input class="inputFormCreateClient" outlined v-model="newClientCity" label="City" />
                <q-input class="inputFormCreateClient" outlined v-model="newClientState" label="State" />
                <q-input class="inputFormCreateClient" outlined v-model="newClientDistrict" label="District" />
                <q-input class="inputFormCreateClient" outlined v-model="newClientCustomerNotes" filled type="textarea"
                    label="Customer notes" />
                <small style="font-size: 15px; color: green" v-if="createInformation">{{createInformation}}</small>
            </q-card-section>
            <div class="q-pa-md q-gutter-sm" style="align-itens: right; text-align: right;">
                <q-btn flat style="color: red" @click="cleanInputsCreateClient()" label="Clean" />
                <q-btn color="primary" @click="funCreateClient()" label="Send" />
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    props: {
        createClient: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            modalCreateClient: true,
            newClientName: '',
            newClientbirthDate: moment().format('DD/MM/YYYY'),
            newClientEmail: '',
            newClientCpf: '',
            newClientPhone: '',
            newClientCep: '',
            newClientAdress: '',
            newClientCity: '',
            newClientState: '',
            newClientDistrict: '',
            newClientCustomerNotes: '',
            createInformation: null,
        }
    },

    methods: {
        closeModalCreateClient() {
            this.$emit('createClient', false)
        },
        getCep() {

            if (this.newClientCep.length > 5) {
                var config = {
                    method: 'get',
                    url: `https://viacep.com.br/ws/${this.newClientCep}/json/`,
                    headers: {}
                };

                axios(config)
                    .then((response) => {
                        if (response.data) {
                            console.log(response.data)
                            this.newClientAdress = response.data.logradouro
                            this.newClientCity = response.data.localidade
                            this.newClientState = response.data.uf
                            this.newClientDistrict = response.data.bairro

                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        },
        funCreateClient() {
            const data = new Object()
            data.name = this.newClientName
            data.birth_date = moment(this.newClientbirthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
            data.email = this.newClientEmail
            data.cpf = this.newClientCpf
            data.phone = this.newClientPhone
            data.cep = this.newClientCep
            data.adress = this.newClientAdress
            data.city = this.newClientCity
            data.state = this.newClientState
            data.district = this.newClientDistrict
            data.customerNotes = this.newClientCustomerNotes

            const config = {
                method: 'post',
                url: 'http://localhost:3000/clients',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit('refreshListClients', true)
                    this.createInformation = 'Client created with success'
                })
                .catch((error) => {
                    console.log(error);
                    this.createInformation = error.message
                    this.cleanInputsCreateClient()
                });

        },
        cleanInputsCreateClient() {
            this.newClientName = ''
            this.newClientbirthDate = moment().format('DD/MM/YYYY')
            this.newClientEmail = ''
            this.newClientCpf = ''
            this.newClientPhone = ''
            this.newClientCep = ''
            this.newClientAdress = ''
            this.newClientCity = ''
            this.newClientState = ''
            this.newClientDistrict = ''
            this.newClientCustomerNotes = ''
        }

    }
}

</script>

<style>
.inputFormCreateClient {
    margin: 15px;

}
</style>