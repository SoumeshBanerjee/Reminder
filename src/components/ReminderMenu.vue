<template>
  <nav class="pagination">
    <ul class="pagination-list">
      <li>
        <a class="pagination-link is-current">Inbox
          <span class="tag is-warning">{{inboxCount}}</span>
        </a>
      </li>
      <li>
        <a class="pagination-link">Snoozed
          <span class="tag is-warning">{{snoozedCount}}</span>
        </a>
      </li>
      <li>
        <a class="pagination-link">Done
          <span class="tag is-warning">{{doneCount}}</span>
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
    >
        <div class="columns">
            <div class="column is-5">
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="dd/mm/yyyy">
                    <span class="icon is-small is-left">
                        <i class="fas fa-calendar"></i>
                    </span>
                </div>
            </div>
            <div class="column is-5">
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="HH:MM">
                    <span class="icon is-small is-left">
                        <i class="fas fa-clock"></i>
                    </span>
                </div>
            </div>
            <div class="column is-2">
                <div class="select">
                    <select>
                        <option selected>AM</option>
                        <option>PM</option>
                    </select>
                </div>
            </div>
        </div>
        <textarea class="textarea" placeholder="Description for the Reminder" rows="4"></textarea>
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
      showAddNewReminderPropmpt: false
    };
  },
  methods: {
    addNewReminderPropmptDismissed() {
      this.showAddNewReminderPropmpt = false;
    }
  },
  computed: {
    inboxCount() {
      return 0;
    },
    snoozedCount() {
      return 1;
    },
    doneCount() {
      return 2;
    }
  }
};
</script>
