<template>
    <main>
        <Nav />
    </main>
    <section>
        <h1>{{object}}</h1>
        <div v-if="token" class="chart">
            <Chart class="chart-container" ref="myChart" type="line" :data="basicData" :options="basicOptions" />
        </div>
        <div v-if="token" class="all-messages">
            <table>
                <tr>
                    <th>Aktie</th>
                    <th>Antal att köpa</th>
                    <th>Nuvarande kurs</th>
                </tr>
                <tr class="all-objects">
                    <td>{{objects.object}}</td>
                    <td>{{objects.amount}} st</td>
                    <td>{{objects.current_price}} kr</td>
                </tr>
            </table>
            <div class="small-screen">
                <div class="all-objects">
                    <h3><b>{{objects.object}}</b></h3><br>
                    <i>Antal:</i><br> {{objects.amount}} st <br>
                    <i>Nuvarande kurs:</i><br> {{objects.current_price}} kr <br>
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

import { ref } from '/node_modules/vue'
import Chart from 'primevue/chart';

export default {
  name: 'Test',
  components: {
    Nav,
    Chart,
  },
  setup() {
    const myChart = ref()

    const addData = (message) => {
      // console.log("addData")
      if (typeof message == "object") {
        const chart = myChart.value.chart
        chart.data.labels.push(message.label)
        chart.data.datasets[0].data.push(message.price)
        chart.update()
      }
    }

    return {
      myChart,
      addData,
      basicData: {
        labels: [],
        datasets: [
          {
            label: 'Kursöversikt',
            data: [],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
          }
        ]
      },
      basicOptions: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      },
    }
  },
  data() {
      return {
          token: this.token,
          object: this.$route.params.obj,
          objects: "",
          prev_price: "",
          messages: [],
          labels: "one",
          prices: []
      }
  },
  async mounted() {
      this.loaded = false;
      if (this.token) {
          await this.getMe();
          await this.submitToken();
      }
  },
  methods: {
      getMe() {
          let that = this;
          fetch("http://localhost:1337/trade/showOne/" + this.object, {
              headers: {
                'x-access-token': that.token
              },
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(result) {
              // console.log("all res", result);

              that.objects = result.data;
              let labels = [];
              let prices = [];
              for (let x in result.prices) {
                  that.addData({"price": result.prices[x].price, "label": result.prices[x].label});
              };
              that.prev_price = result.data.previous_price;
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
              console.log("dat", data);
              this.addData(data.message)
          });
      },
      submitMessage() {
          const CHAT_ROOM = "myRandomChatRoomId";
          const message = this.inputMessageText;
          console.log("sock");
          SocketioService.sendMessage({message, roomName: CHAT_ROOM}, cb => {
            // callback is acknowledgement from server
            console.log("cb2", cb);

            this.data.labels.push(message.label);
            this.data.datasets[0].data.push(message.price);

            this.messages.push({
                message
              });
          });
          // clear the input after the message is sent
          this.inputMessageText = "";
          this.saved = "";
      }
  }
}
</script>

<style>
.chart {
    border: 2px solid #036846;
}

canvas {
    height: 200px;
}

.chart-container {
    position: relative;
    margin: auto;
    width: 100%;
}

@media (max-width: 630px) {
    .chart-container {
        position: relative;
        margin: auto;
        width: 190px;
    }
}

</style>
