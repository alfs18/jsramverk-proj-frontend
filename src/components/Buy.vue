<template>
<main>
    <Nav />
</main>
<section class="form">
    <h1>{{object}}</h1>
    <div v-if="token" class="all-content">
        <div class="left-side">
            <h3>{{data.title}}</h3>
            <p><b>{{data.object}}</b></p>
            <p><i>Tillgängliga aktier:</i> {{data.amount}} st</p>
            <p><i>Senaste priset:</i> {{data.current_price}} kr</p>
            <form @submit.prevent="submitBuy($data)">
                <label>Antal</label>
                <input type="number" name="amount" value="1"><br>
                <label>Pris</label>
                <input type="number" step="0.01" min=0 name="price" :value="`${data.current_price}`">

                <p class="message">{{message}}</p>
                <input type="submit" :value="`${data.title}`">
            </form>
        </div>

        <div class="content">
            <h2>Att handla för</h2>
            <p>{{data.cash}} kr</p><br>
            <div class="all-messages">
                <table>
                    <tr>
                        <th>Aktie</th>
                        <th>Antal att köpa</th>
                        <th>Nuvarande kurs</th>
                    </tr>
                    <tr class="all-objects">
                        <td>{{data.object}}</td>
                        <td>{{data.amount}} st</td>
                        <td>{{data.current_price}} kr</td>
                    </tr>
                </table>
                <div class="small-screen">
                    <div class="all-objects">
                        <h3><b>{{data.object}}</b></h3><br>
                        <i>Antal att köpa:</i><br> {{data.amount}} st <br>
                        <i>Nuvarande kurs:</i><br> {{data.current_price}} kr <br>
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
import SocketioService from '../services/socketio.service.js';

export default {
    name: 'ShowOneObject',
    props: { },
    components: {
        Nav,
    },
    data() {
        return {
            token: this.token,
            user_id: this.user_id,
            object: this.$route.params.obj,
            message: "",
            messages: [],
            data: ""
        }
    },
    mounted() {
        if (this.token) {
            this.getMe();
            this.submitToken();
        }
    },
    methods: {
        getMe() {
            let that = this;
            fetch("http://localhost:1337/trade/buy/" + this.object, {
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

                that.object = result.data.object;
                that.cash = result.data.cash;
                that.data = result.data;
            });
        },
        submitToken() {
            SocketioService.setupSocketConnection("user");

            const CHAT_ROOM = "myRandomChatRoomId";
            const message = "connected to chat";
            SocketioService.sendMessage({message, roomName: CHAT_ROOM}, cb => {
              // callback is acknowledgement from server
              console.log("cb", cb);
              this.messages.push({
                  message
                });
            });

            SocketioService.subscribeToMessages((err, data) => {
                this.messages.push(data);
            });
        },
        submitBuy: function () {
            var payload = {
                buy_amount: event.target.amount.value,
                object_amount: this.data.amount,
                price: event.target.price.value,
                cash: this.data.cash,
                user_id: this.user_id
            }
            axios
              .post('http://localhost:1337/trade/buy/' + this.object, payload, {
                  headers: {
                  'x-access-token': this.token
                }
              }).then(response => {
                console.log('posting')
                console.log(response)

                if (response.data.message) {
                    this.message = response.data.message;
                } else {
                    const CHAT_ROOM = "myRandomChatRoomId";
                    var message = {
                        price: response.data.price,
                        label: response.data.label
                    };
                    console.log("msg pl", message);
                    SocketioService.sendMessage({message, roomName: CHAT_ROOM}, cb => {
                      // callback is acknowledgement from server
                      console.log("cb", cb);
                      this.messages.push({
                          message
                        });
                    });

                    this.$router.push("/trade");
                }
              });
        }
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

.content {
    float: left;
}

button {
  padding: 0.5em;
  font-size: 12pt;
  margin-bottom: 0.5em;
}

@media (max-width: 630px) {
    .left-side {
        float: none;
        width: 90%;
    }
}
</style>
