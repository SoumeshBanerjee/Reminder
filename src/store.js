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
        date: "Jan. 20, 2019 10:08 AM",
        description: "aaaaa aaaaa aaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaaaaaa",
        status: "done"
      },
      {
        id: "1123",
        date: "Jan. 20, 2019 10:08 AM",
        description: "Soumesh",
        status: "done"
      },
      {
        id: "112",
        date: "Jan. 20, 2019 10:08 AM",
        description: "Yahoo",
        status: "done"
      },
      {
        id: "1123411",
        date: "Jan. 20, 2019 10:08 AM",
        description: "Microsoft",
        status: "done"
      },
      {
        id: "1123412",
        date: "Jan. 20, 2019 10:08 AM",
        description: "Apple",
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
