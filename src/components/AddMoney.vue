<template>
<main>
    <Nav />
</main>
<section class="form">
    <h1>Kontoöversikt</h1>
    <div v-if="token" class="">
        <h2>Nuvarande saldo</h2>
        <p>{{cash}} kr</p><br>
        <div class="form-div">
            <h2>Lägg till pengar</h2>
            <form @submit.prevent="submitForm($data)">
                <input class="input-field" type="number" value="0" name="money"><br>
                <input class="button" type="submit" value="Lägg till">
            </form>
        </div>
    </div>
    <p v-if="!token">Vänligen logga in för att ta del av innehållet.</p>
</section>
</template>

<script>
import Nav from './Nav.vue'
import axios from "axios"

export default {
    name: 'AddMoney',
    props: { },
    components: {
        Nav,
    },
    data() {
        return {
            token: this.token,
            user_id: this.user_id,
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

                that.cash = result.data[0].cash;
            });
        },
        submitForm: function () {
            console.log("money", event.target.money.value)
            let that = this;
            axios
              .post('http://localhost:1337/add-money/' + this.user_id,
              {
                money: event.target.money.value
              },
              { headers: {
                  'x-access-token': that.token,
                  }
              }).then(response => {
                console.log('posting')
                // console.log(response)

                this.$router.push("/trade");
              });
        }
    }
}
</script>

<style>
h2 {
    margin-bottom: 0.5em;
}

.button {
  padding: 0.5em;
  font-size: 12pt;
  margin-bottom: 0.5em;
}

.form-div {
    border: 2px solid black;
    padding: 2em;
    background-color: hsl(160, 25.2%, 53.3%);
}

.input-field:focus:valid {
    background-color: #fff;
}

.input-field:focus:invalid {
    background-color: #fcc;
    outline: 3px solid red;
}

.input-field:focus {
    outline: 3px solid #036846;
}

@media (min-width: 768px) {
    .input-field {
        /* vw = viewport width */
        width: 30vw;
    }
}
</style>
