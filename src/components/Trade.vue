<template>
<main>
    <Nav />
</main>
<section class="form">
    <h1>Kontoöversikt</h1>
    <h1>Köp/Sälj</h1>
    <div v-if="token" class="">
        <h2>Att handla för</h2>
        <p>{{cash}} kr</p><br>
        <button @click=submitAddMoney type="submit">Lägg till pengar</button>
        <h2>Mina aktier</h2>
        <div class="all-messages">
            <table>
                <tr>
                    <th class="first-line">Aktie</th>
                    <th class="second-line">Antal</th>
                    <th>Inköpskurs</th>
                    <th class="hide">Nuvarande kurs</th>
                    <th class="hide">Förändring sedan köp</th>
                </tr>
                <tr class="all-objects" v-for="obj in data">
                    <td>{{obj.object}}</td>
                    <td>{{obj.amount}} st</td>
                    <td>{{obj.purchase_price}} kr</td>
                    <td class="hide">{{obj.current_price}} kr</td>
                    <td class="hide">{{obj.difference}} kr</td>
                    <td><button @click=submitBuySell :value="`buy/${obj.object}`" type="submit">Köp</button></td>
                    <td><button @click=submitBuySell :value="`sell/${obj.object}`" type="submit">Sälj</button></td>
                    <td><button @click=submitShowOne :value="`${obj.object}`">Statistik</button></td>
                </tr>
            </table>
            <div class="small-screen">
                <div class="all-objects" v-for="obj in data">
                    <h3><b>{{obj.object}}</b></h3><br>
                    <i>Antal:</i><br> {{obj.amount}} st <br>
                    <i>Inköpskurs:</i><br> {{obj.purchase_price}} kr <br>
                    <i>Nuvarande kurs:</i><br> {{obj.current_price}} kr <br>
                    <i>Förändring sedan köp:</i><br> {{obj.difference}} kr <br>
                    <br><button @click=submitBuySell :value="`buy/${obj.object}`" type="submit">Köp</button><br>
                    <button @click=submitBuySell :value="`sell/${obj.object}`" type="submit">Sälj</button><br>
                    <button @click=submitShowOne :value="`${obj.object}`">Statistik</button>
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

const d = new Date();
var theTime = d.toLocaleTimeString();
var myList = [{"time": "2023-11-10 11:41:13", "price": 0.55}, {"time": "2023-12-15 16:21:30", "price": 0.80}];

export default {
    name: 'Trade',
    props: { },
    components: {
        Nav,
    },
    data() {
        return {
            token: this.token,
            user_id: this.user_id,
            info: myList,
            object: "",
            cash: 0,
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
            fetch("http://localhost:1337/trade", {
                headers: {
                  'x-access-token': that.token,
                  'user_id': that.user_id
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                // console.log("res", result);

                that.object = result.object;
                that.cash = result.data[0].cash;
                that.data = result.data;
            });
        },
        submitBuySell: function () {
            // console.log("obj", event.target);
            var obj = event.target.value;

            this.$router.push('/trade/' + obj)
        },
        submitAddMoney: function () {
            this.$router.push('/trade/add-money')
        },
        submitShowOne: function () {
            var obj = event.target.value;

            this.$router.push('/trade/show-one/' + obj)
        }
    }
}
</script>

<style>
h2 {
    margin-bottom: 0.5em;
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
