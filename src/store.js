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
    reminders: [
      {
        "id": 62,
        "description": "Work Work Work and more work",
        "due": "2019-02-22 22:12:13",
        "completed": 1,
        "editable": false
      },
      {
        "id": 92,
        "description": "happy Done",
        "due": "2019-02-22 10:12:13",
        "completed": 0,
        "editable": false
      },
      {
        "id": 142,
        "description": "happy Done",
        "due": "2019-02-22 10:12:13",
        "completed": 0,
        "editable": false
      }
    ],
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
      reminders.map(rem => {
        rem.editable = false
        return rem
      });
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
    },
    updateEditableValueForReminder(state, { id, value }) {
      const index = state.reminders.findIndex(reminder => reminder.id === id);
      state.reminders[index].editable = value
    },
    updateReminder(state, obj) {
      const index = state.reminders.findIndex(reminder => reminder.id === obj.id);
      state.reminders[index].description = obj.description
      state.reminders[index].due = obj.due
      state.reminders[index].editable = false
    }
  },
  actions: {
    editField(ctx, id) {
      ctx.commit("updateEditableValueForReminder", { id, value: true })
    },
    exitEditField(ctx, id) {
      ctx.commit("updateEditableValueForReminder", { id, value: false })
    },
    updateReminder(ctx, obj) {
      ReminderManager.updateReminder(obj.id, obj)
        .then(resp => {
          if (!resp.data.ok) {
            throw new Error(`Response received from server but not ok, ${resp.data}`)
          }
          ctx.commit("updateReminder", obj)
        })
        .catch(err => {
          ctx.commit("setGlobalErrorMessage", `Failed to update the reminder for the user`)
          console.error(`Failed to update reminder ${err}`)
        })
    },
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
