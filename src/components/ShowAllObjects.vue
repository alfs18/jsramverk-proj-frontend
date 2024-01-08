<template>
<main>
    <Nav />
</main>
<section class="form">
    <h1>Börsen</h1>
    <div v-if="token" class="">
        <div class="">
            <div class="all-messages">
                <table>
                    <tr>
                        <th>Aktie</th>
                        <th>Antal att köpa</th>
                        <th>Nuvarande kurs</th>
                    </tr>
                    <tr class="all-objects" v-for="obj in data">
                        <td>{{obj.object}}</td>
                        <td>{{obj.amount}} st</td>
                        <td>{{obj.current_price}} kr</td>
                        <td><button @click=submitBuy :value="`buy/${obj.object}`" type="submit">Köp</button></td>
                        <td><button @click=submitShowOne :value="`${obj.object}`">Statistik</button></td>
                    </tr>
                </table>
                <div class="small-screen">
                    <div class="all-objects" v-for="obj in data">
                        <h3><b>{{obj.object}}</b></h3><br>
                        <i>Antal att köpa:</i> <br>{{obj.amount}} st <br>
                        <i>Nuvarande kurs:</i> <br>{{obj.current_price}} kr <br>
                        <br><button @click=submitBuy :value="`buy/${obj.object}`" type="submit">Köp</button>
                        <button @click=submitShowOne :value="`${obj.object}`">Statistik</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p v-if="!token">Vänligen logga in för att ta del av innehållet.</p>
</section>
</template>

<script>
import Nav from './Nav.vue'
import axios from "axios"

export default {
    name: 'ShowAllObjects',
    props: { },
    components: {
        Nav,
    },
    data() {
        return {
            token: this.token,
            user_id: this.user_id,
            data: ""
        }
    },
    mounted() {
        if (this.token) {
            this.getMe();
        }
    },
    methods: {
        getMe() {
            let that = this;
            fetch("http://localhost:1337/trade/showAll/", {
                headers: {
                  'x-access-token': that.token
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                // console.log("all res", result);

                that.data = result.data;
            });
        },
        submitBuy: function () {
            var obj = event.target.value;

            this.$router.push('/trade/' + obj)
        },
        submitShowOne: function () {
            // console.log("obj", event.target);
            var obj = event.target.value;

            this.$router.push('/trade/show-one/' + obj)
        },
    }
}
</script>

<style>
h2, h3 {
    margin-bottom: 0.5em;
}

h3 {
    text-align: center;
}

button {
  padding: 0.5em;
  font-size: 12pt;
  margin-bottom: 0.5em;
}

@media (min-width: 768px) {
    .input-field {
        /* vw = viewport width */
        width: 30vw;
    }
}
</style>
