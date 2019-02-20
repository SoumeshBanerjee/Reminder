<template>
  <div class="home">
    <div class="container is-fullhd">
      <br>
      <h3 class="subtitle is-3">{{userName}}'s {{$store.state.APP_NAME}}</h3>
      <RemindersPane></RemindersPane>
    </div>
  </div>
</template>


<style lang="scss" scoped>
// .pagination-list{
//   flex-grow: 1;
//   justify-content: center;
// }
.subtitle.is-3{
  text-align: left;
}
.notification>strong>.tag{
  margin-left: 0;
}
</style>



<script>
import RemindersPane from '@/components/RemindersPane.vue'
import Util from '@/controllers/Util.js'

export default {
  name: 'home',
  components: {
    RemindersPane
  },
  methods:{
    hideNotification(){
      this.shouldShowNotification = false
    }
  },
  data(){
    return {
      shouldShowNotification: false,
      totalNotificationCount: 1,
    }
  },
  computed: {
    userName(){
      return Util.getCookie("UserName")
    }
  }
}
</script>
