<template>
  <div id="app">
    <!-- <nav class="navbar is-info" v-if="isAuthenticatedUser">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">Inbox</a>
          <a class="navbar-item">Snoozed</a>
          <a class="navbar-item">Done</a>
        </div>
      </div>
    </nav> -->
    <router-view/>
  </div>
</template>


<script>
import UserAuthManager from '@/controllers/UserAuthManager.js'
export default {
  name: "App",
  computed: {
    isAuthenticatedUser(){
      return this.$store.state.isAuthenticatedUser
    }
  },
  mounted(){
    UserAuthManager.isAuthenticatedUser()
    .then(resp => {
      if (!resp.ok) {
        this.$router.push({name: `newuser`})
      }else{
        this.$router.push({name: `home`, params: { id: resp.cookie } })
        this.$store.commit('userAuthenticated', true)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>



<style lang="scss" scoped>
#app{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  .navbar{
    .navbar-start{
      flex-grow: 1;
      justify-content: center;
    }
  }
}
</style>
