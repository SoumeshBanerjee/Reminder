import Vue from 'vue'
import Vuex from 'vuex'
import ReminderManager from '@/controllers/ReminderManager.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    APP_NAME: "Reminders",
    isAuthenticatedUser: false,
    searchKeyword: "",
    tabFilter: 'inbox',
    reminders: [],
    globalErrorMessage: ""
  },
  mutations: {
    userAuthenticated(state, val) {
      state.isAuthenticatedUser = val
    },
    deleteReminder(state, id) {
      const index = state.reminders.findIndex(reminder => reminder.id === id);
      state.reminders.splice(index, 1);
    },
    setReminders(state, reminders) {
      state.reminders = reminders
    },
    setGlobalErrorMessage(state, msg) {
      state.globalErrorMessage = msg
    },
    switchTabFilter(state, currentFilter) {
      state.tabFilter = currentFilter
    },
    markDoneReminder(state, id) {
      const index = state.reminders.findIndex(reminder => reminder.id === id);
      state.reminders[index].completed = 1
    },
    markUnDoneReminder(state, id) {
      const index = state.reminders.findIndex(reminder => reminder.id === id);
      state.reminders[index].completed = 0
    },
    addNewReminder(state, reminder) {
      state.reminders.push(reminder)
    }
  },
  actions: {
    deleteReminder(ctx, id) {
      ReminderManager.deleteReminder(id)
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit("deleteReminder", id)
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to delete the reminder for the user`)
          console.error(`Failed to delete reminder ${err}`)
        })
    },
    markDoneReminder(ctx, id) {
      ReminderManager.markDoneReminder(id)
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit("markDoneReminder", id)
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to mark reminder as done`)
          console.error(`Failed to mark reminder as done ======> ${err}`)
        })
    },
    markUnDoneReminder(ctx, id) {
      ReminderManager.markUnDoneReminder(id)
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit("markUnDoneReminder", id)
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to mark reminder as undone`)
          console.error(`Failed to mark reminder as done ======> ${err}`)
        })
    },
    switchTabFilter(ctx, currentFilter) {
      ctx.dispatch('fetchReminders')
      ctx.commit('switchTabFilter', currentFilter)
    },
    fetchReminders(ctx) {
      ReminderManager.getAllReminders()
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit("setReminders", resp.data.results)
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to retrive the reminders for the user`)
          console.error(`Reminder failed to come ======> ${err}`)
        })
    },
    addNewReminder(ctx, payload) {
      ReminderManager.createReminder(payload)
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit('addNewReminder', {
            id: resp.data.results.insertId,
            description: payload.description,
            due: payload.due,
            completed: 0
          }
          )
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to save the reminders for the user`)
          console.error(`Reminder failed to save ======> ${err}`)
        })
    }
  }
})
