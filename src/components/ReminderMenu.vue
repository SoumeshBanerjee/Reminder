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
      @dismissed="addNewReminderPropmptDismissed"
      @approved="saveNewReminder"
    >
      <div class="columns">
        <div class="column is-5">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              :class="{'is-danger': newReminderModel.errorCSS.date}"
              type="text"
              placeholder="yyyy/mm/dd"
              v-model="newReminderModel.date"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-calendar"></i>
            </span>
          </div>
        </div>
        <div class="column is-5">
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              :class="{'is-danger': newReminderModel.errorCSS.time}"
              type="text"
              placeholder="HH:MM"
              v-model="newReminderModel.time"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-clock"></i>
            </span>
          </div>
        </div>
        <div class="column is-2">
          <div class="select">
            <select v-model="newReminderModel.am_pm">
              <option selected>AM</option>
              <option>PM</option>
            </select>
          </div>
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
        date: "",
        time: "",
        am_pm: "AM",
        errorCSS: {
          description: false,
          date: false,
          time: false
        }
      }
    };
  },
  methods: {
    addNewReminderPropmptDismissed() {
      this.showAddNewReminderPropmpt = false;
      this.newReminderModel.errorMessage = "";
      this.newReminderModel.description = "";
      this.newReminderModel.date = "";
      this.newReminderModel.time = "";
      this.newReminderModel.am_pm = "AM";
      this.newReminderModel.errorCSS.description = false;
      this.newReminderModel.errorCSS.time = false;
      this.newReminderModel.errorCSS.date = false;
    },
    createDateString(d) {
      return `${d.getFullYear()}-${d.getMonth() +
        1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    },
    saveNewReminder() {
      let dateObj = new Date(
        `${this.newReminderModel.date} ${this.newReminderModel.time} ${
          this.newReminderModel.am_pm
        }`
      );
      if (dateObj == "Invalid Date") {
        this.newReminderModel.errorCSS.time = true;
        this.newReminderModel.errorCSS.date = true;
        this.newReminderModel.errorMessage =
          "Invalid Date/ Time use(YYYY/MM/DD HH:MM) format";
      } else if (
        this.newReminderModel.description === "" ||
        this.newReminderModel.description.length < 5
      ) {
        this.newReminderModel.errorCSS.time = false;
        this.newReminderModel.errorCSS.date = false;
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
          due: this.createDateString(dateObj)
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
