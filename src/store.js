import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    APP_NAME: "Reminders",
    isAuthenticatedUser: false,
    searchKeyword: "",
    reminders: [
      {
        id: "11234",
        date: "Feb. 20, 2019 10:08 AM",
        description: "Build Reminder App",
        status: "done"
      },
      {
        id: "1123",
        date: "Feb. 20, 2019 07:08 AM",
        description: "Go For a Walk",
        status: "done"
      },
      {
        id: "112",
        date: "Feb. 20, 2019 5:08 PM",
        description: "Return Amazon Order",
        status: "done"
      },
      {
        id: "1123411",
        date: "Feb. 20, 2019 6:08 PM",
        description: "Buy a storage box from Ikea",
        status: "done"
      },
      {
        id: "1123412",
        date: "Feb. 20, 2019 10:08 PM",
        description: "Recharge my DTH",
        status: "done"
      }
    ]
  },
  mutations: {
    userAuthenticated(state, val){
      state.isAuthenticatedUser = val
    },
    deleteReminder(state, id){
      const index = state.reminders.findIndex(reminder => reminder.id === id);
      state.reminders.splice(index, 1);
    }
  },
  actions: {
    deleteReminder(ctx, id){
      ctx.commit("deleteReminder", id)
    }
  }
})
