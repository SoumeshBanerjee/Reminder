<template>
  <div class="notification">
    <div class="columns">
      <div class="column is-2">{{dueDate}}</div>
      <div class="column is-9">{{descriptionText}}</div>
      <div class="column is-1">
        <span
          class="icon done space-right"
          v-if="$store.state.tabFilter === 'inbox' || $store.state.tabFilter === 'snooze'"
        >
          <i class="fas fa-check fa-lg" @click="markDone(id)"/>
        </span>
        <span class="icon undone space-right" v-else>
          <i class="fas fa-undo fa-lg" @click="markUndone(id)"/>
        </span>
        &nbsp;
        <span class="icon trash is-pulled-right">
          <i class="fas fa-trash fa-lg" @click="markDelete(id, descriptionText)"></i>
        </span>
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
.done:hover {
  color: hsl(141, 71%, 48%);
}
.undone:hover{
    color: hsl(48, 100%, 67%);
}
.trash:hover {
  color: hsl(348, 100%, 61%);
}
.space-right {
  margin-left: 1em;
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
    }
  }
};
</script>

