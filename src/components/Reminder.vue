<template>
  <div class="notification">
    <div class="columns is-vcentered">
      <div class="column is-2" v-html="computedDueDate"></div>
      <div class="column is-8">{{descriptionText}}</div>
      <div class="column is-2">
        <div class="columns is-mobile is-vcentered" style="text-align: center">
          <div class="column">
            <span
              class="icon has-text-success space-right"
              v-if="$store.state.tabFilter === 'inbox' || $store.state.tabFilter === 'snooze'"
            >
              <i class="fas fa-check fa-2x" @click="markDone(id)"/>
            </span>
            <span class="icon has-text-link space-right" v-else>
              <i class="fas fa-undo fa-2x" @click="markUndone(id)"/>
            </span>
          </div>
          <div class="column">
            <span
              class="icon has-text-link"
              v-if="$store.state.tabFilter === 'inbox' || $store.state.tabFilter === 'snooze'"
            >
              <i class="fas fa-edit fa-2x" @click="markEdit(id)"></i>
            </span>
          </div>
          <div class="column">
            <span class="icon has-text-danger">
              <i class="fas fa-trash fa-2x" @click="markDelete(id, descriptionText)"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  text-align: left;
  margin-bottom: 0.5em;
}
.icon {
  opacity: 0.2;
  cursor: pointer;
  transition: all 1s;
}
.icon:hover {
  opacity: 1;
}
.space-right {
  margin-left: 1em;
}
.columns.is-vcentered {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>



<script>
export default {
  name: "Reminder",
  props: ["id", "dueDate", "descriptionText"],
  methods: {
    markDone(id) {
      this.$emit("done", id);
    },
    markUndone(id) {
      this.$emit("undone", id);
    },
    markDelete(id, descriptionText) {
      this.$emit("delete", id, descriptionText);
    },
    markEdit(id) {
      this.$store.dispatch("editField", id);
    }
  },
  computed: {
    computedDueDate() {
      let dt = new Date(this.dueDate);
      if (dt == "Invalid Date") {
        console.error(`Date parsing failed`);
        return this.dueDate;
      }

      let hours = dt.getHours();
      let am_pm = hours >= 12 ? "PM" : "AM";
      hours %= 12;

      let minutes = dt.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;

      const today = new Date();

      let isToday =
        dt.getDate() == today.getDate() &&
        dt.getMonth() == today.getMonth() &&
        dt.getFullYear() == today.getFullYear();

      let timeString = `${hours}:${minutes} ${am_pm}`

      if (isToday) {
        return `Today <i class="far fa-clock"></i> ${timeString}` 
      }else{
        return `${dt.getFullYear()}/${dt.getMonth()+1 <= 10 ? '0'+(dt.getMonth()+1) : dt.getMonth()+1}/${dt.getDate()} <i class="far fa-clock"></i> ${timeString}`
      }
    }
  }
};
</script>

