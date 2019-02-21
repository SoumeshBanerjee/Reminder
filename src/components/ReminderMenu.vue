<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li>
        <a
          class="pagination-link"
          :class="{'is-current': $store.state.tabFilter === 'inbox'}"
          @click="$store.dispatch('switchTabFilter', 'inbox')"
        >
          Inbox
          <span class="tag is-warning" v-if="inboxCount>0">{{inboxCount}}</span>
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{'is-current': $store.state.tabFilter === 'snooze'}"
          @click="$store.dispatch('switchTabFilter', 'snooze')"
        >
          Snoozed
          <span class="tag is-warning" v-if="snoozedCount>0">{{snoozedCount}}</span>
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{'is-current': $store.state.tabFilter === 'done'}"
          @click="$store.dispatch('switchTabFilter', 'done')"
        >
          Done
          <span class="tag is-warning" v-if="doneCount>0">{{doneCount}}</span>
        </a>
      </li>
    </ul>
    <a class="pagination-next" @click="showAddNewReminderPropmpt = true">Add New Reminder</a>
    <Prompt
      :is-show="showAddNewReminderPropmpt"
      prompt-title="Add a new Reminder"
      prompt-ok-btn="Remind Me!"
      prompt-ok-btn-class="is-warning"
      height="80%"
      @dismissed="addNewReminderPropmptDismissed"
      @approved="saveNewReminder"
    >
      <div class="columns">
        <div class="column is-6">
          <b-datepicker v-model="newReminderModel.date" icon-pack="fas" size="is-medium"></b-datepicker>
        </div>
        <div class="column is-6">
          <b-timepicker v-model="newReminderModel.time" inline hour-format="12" size="is-small"></b-timepicker>
        </div>
      </div>
      <textarea
        class="textarea"
        :class="{'is-danger': newReminderModel.errorCSS.description}"
        placeholder="Description for the Reminder"
        rows="4"
        v-model="newReminderModel.description"
      ></textarea>
      <br>
      <p
        class="has-text-danger"
        v-if="newReminderModel.errorMessage"
      >{{newReminderModel.errorMessage}}</p>
    </Prompt>
  </nav>
</template>

<style lang="scss" scoped>
.tag {
  margin-left: 1em;
  border-radius: 2em;
}
.is-current > .is-warning {
  background-color: #333;
  color: #ffffff;
}
</style>


<script>
import Prompt from "@/components/Prompt.vue";
export default {
  name: "ReminderMenu",
  components: {
    Prompt
  },
  data() {
    return {
      showAddNewReminderPropmpt: false,
      newReminderModel: {
        errorMessage: "",
        description: "",
        date: new Date(),
        time: new Date(),
        errorCSS: {
          description: false
        }
      }
    };
  },
  methods: {
    addNewReminderPropmptDismissed() {
      this.showAddNewReminderPropmpt = false;
      this.newReminderModel.errorMessage = "";
      this.newReminderModel.description = "";
      this.newReminderModel.date = new Date();
      this.newReminderModel.time = new Date();
      this.newReminderModel.errorCSS.description = false;
    },
    createDateString(d) {
      return `${d.getFullYear()}-${d.getMonth() +
        1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    },
    saveNewReminder() {
      let dueDate = new Date()
      
      dueDate.setFullYear(this.newReminderModel.date.getFullYear())
      dueDate.setMonth(this.newReminderModel.date.getMonth())
      dueDate.setDate(this.newReminderModel.date.getDate())

      dueDate.setHours(this.newReminderModel.time.getHours())
      dueDate.setMinutes(this.newReminderModel.time.getMinutes())


      if (
        this.newReminderModel.description === "" ||
        this.newReminderModel.description.length < 5
      ) {
        this.newReminderModel.errorCSS.description = true;
        this.newReminderModel.errorMessage =
          "Description is mandatory and should be at least 5 character";
      } else if (this.newReminderModel.description.length >= 230) {
        this.newReminderModel.errorCSS.description = true;
        this.newReminderModel.errorMessage =
          "Description max allowed length is 230, exceeded limit";
      } else {
        this.newReminderModel.errorCSS.description = false;
        this.newReminderModel.errorMessage = "";
        this.$store.dispatch("addNewReminder", {
          description: this.newReminderModel.description,
          due: this.createDateString(dueDate)
        });
        this.addNewReminderPropmptDismissed();
      }
    }
  },
  computed: {
    inboxCount() {
      return 0;
    },
    snoozedCount() {
      return 0;
    },
    doneCount() {
      return 0;
    }
  }
};
</script>
