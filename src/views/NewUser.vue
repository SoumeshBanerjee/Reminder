<template>
    <section class="hero is-info is-fullheight">
        <div class="notification is-warning" v-if="errorMessage">
            <button class="delete" @click="errorMessage=''"></button>
            {{errorMessage}}
        </div>
        <div class="hero-body">
            <div class="container">
            <h1 class="title">
                Welcome to <strong>Reminder</strong>
            </h1>
            <h2 class="subtitle">
                We'll help you to keep track of your important tasks, enter your name to proceed
                <br>
                <input class="input" type="text" placeholder="Your Full Name" v-model="usersName">
                &nbsp;
                <a class="button is-primary" :disabled="isProceedDisabled" @click="proceedPressed">Proceed</a>
            </h2>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
$margin-top:1em;
.input{
    width: 50%;
    margin-top: $margin-top;
}
.button{
    margin-top: $margin-top;
}
.notification{
    border-radius: 0;
}
</style>

<script>
import UserAuthManager from '@/controllers/UserAuthManager.js'
export default {
    name: 'NewUser',
    data: () => {
        return{
            usersName: "",
            errorMessage: ""
        }
    },
    computed: {
        isProceedDisabled(){
            return this.usersName.length < 3
        }
    },
    methods: {
        proceedPressed(){
            UserAuthManager.createNewAuthUser(this.usersName)
            .then(resp => {
                if (resp.ok) {
                    this.$store.commit('userAuthenticated', true)
                    this.$router.push({name: `home`, params: { id: resp.userId } })
                }else{
                    this.errorMessage = `Failed to create user ERROR_CODE: ${resp.code}`
                }
            })
            .catch(err => {
                this.errorMessage = `Something went wrong ${err}`
            })
        }
    }
}
</script>
