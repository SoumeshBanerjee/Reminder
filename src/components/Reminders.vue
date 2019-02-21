<template>
  <div class="scrollable">
    <div v-for="reminder in filteredReminder" :key="reminder.id">
      <EditableReminder
        v-if="reminder.editable == true"
        :due-date="reminder.due"
        :description-text="processDescription(reminder.description)"
        :id="reminder.id"
        @delete="onDelete"
        @done="onDone"
        @undone="onUndone"
        @onReminderUpdated="reminderUpdated"
      ></EditableReminder>
      <Reminder
        v-else
        :due-date="reminder.due"
        :description-text="processDescription(reminder.description)"
        :id="reminder.id"
        @delete="onDelete"
        @done="onDone"
        @undone="onUndone"
      ></Reminder>
    </div>
    <Prompt
      :is-show="showDeletePrompt"
      prompt-title="Delete the Reminder"
      prompt-ok-btn="Delete"
      prompt-ok-btn-class="is-danger"
      @dismissed="deleteReminderPropmptDismissed"
      @approved="deleteReminderPropmptConfirmedDeletion(deletingReminderId)"
    >
      <strong>Are you sure to delete the Reminder</strong>
      <hr>
      {{deletingReminderDescription}}
    </Prompt>
  </div>
</template>


<style lang="scss" scoped>
.scrollable{
    height: calc(70vh - 10px);
    overflow-y: scroll;
}
</style>


<script>
import Vue from 'vue'
import Reminder from "@/components/Reminder.vue";
import Prompt from "@/components/Prompt.vue";
import EditableReminder from "@/components/EditableReminder.vue";
import Timepicker from 'buefy/dist/components/timepicker'
import DatePicker from 'buefy/dist/components/datepicker'
import 'buefy/dist/buefy.css'
Vue.use(Timepicker)
Vue.use(DatePicker)

export default {
  name: "Reminders",
  created() {
    this.$store.dispatch("fetchReminders");
  },
  components: {
    Reminder,
    EditableReminder,
    Prompt
  },
  computed: {
    filteredReminder() {
      let searchFilteredReminder = this.$store.state.reminders.filter(rem =>
        rem.description
          .toLowerCase()
          .match(this.$store.state.searchKeyword.toLowerCase())
      );
      if (this.$store.state.tabFilter == "inbox") {
        var currTime = new Date();
        searchFilteredReminder = searchFilteredReminder
          .filter(rem => rem.completed == false)
          .filter(rem => new Date(rem.due) < currTime);
      }
      if (this.$store.state.tabFilter == "done") {
        searchFilteredReminder = searchFilteredReminder.filter(
          rem => rem.completed == true
        );
      }
      if (this.$store.state.tabFilter == "snooze") {
        let currTime = new Date();
        searchFilteredReminder = searchFilteredReminder
          .filter(rem => rem.completed == false)
          .filter(rem => new Date(rem.due) > currTime);
      }
      return searchFilteredReminder;
    }
  },
  data() {
    return {
      showDeletePrompt: false,
      deletingReminderDescription: "",
      deletingReminderId: ""
    };
  },
  methods: {
    reminderUpdated(obj){
      this.$store.dispatch("updateReminder", {
        id: obj.id,
        due: obj.due,
        description: obj.description
      })
    },
    onDelete(id, description) {
      this.showDeletePrompt = true;
      this.deletingReminderDescription = description;
      this.deletingReminderId = id;
    },
    onDone(id) {
      this.$store.dispatch("markDoneReminder", id);
    },
    onUndone(id) {
      this.$store.dispatch("markUnDoneReminder", id);
    },
    processDescription(desc) {
      if (desc.length > 100) {
        return `${desc.substring(0, 100)}...`;
      }
      return desc;
    },
    deleteReminderPropmptDismissed() {
      this.showDeletePrompt = false;
      this.deletingReminderDescription = "";
      this.deletingReminderId = "";
    },
    deleteReminderPropmptConfirmedDeletion(id) {
      this.$store.dispatch("deleteReminder", id);
      this.deleteReminderPropmptDismissed();
    }
  }
};
</script>