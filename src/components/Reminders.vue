<template>
  <div>
    <Reminder
      v-for="reminder in filteredReminder"
      :key="reminder.id"
      :due-date="reminder.due"
      :description-text="processDescription(reminder.description)"
      :id="reminder.id"
      @delete="onDelete"
      @done="onDone"
      @undone="onUndone"
    ></Reminder>
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

<script>
import Reminder from "@/components/Reminder.vue";
import Prompt from "@/components/Prompt.vue";

export default {
  name: "Reminders",
  created() {
    this.$store.dispatch("fetchReminders");
  },
  components: {
    Reminder,
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
        let currTime = new Date()
        searchFilteredReminder = searchFilteredReminder.filter(
          rem => rem.completed == false
        ).filter(
          rem => new Date(rem.due) < currTime
        )
      }
      if (this.$store.state.tabFilter == "done") {
        searchFilteredReminder = searchFilteredReminder.filter(
          rem => rem.completed == true
        );
      }
      if (this.$store.state.tabFilter == "snooze") {
        let currTime = new Date()
        searchFilteredReminder = searchFilteredReminder.filter(
          rem => rem.completed == false
        ).filter(
          rem => new Date(rem.due) > currTime
        )
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