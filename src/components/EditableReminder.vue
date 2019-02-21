<template>
  <div class="notification is-editable">
    <div class="columns is-vcentered">
      <div class="column is-3">
        <div class="columns is-vcentered">
          <div class="column">
            <b-datepicker v-model="computedDate" icon-pack="fas" size="is-medium"></b-datepicker>
          </div>
          <div class="column">
            <b-timepicker v-model="computedTime" inline hour-format="12" size="is-small"></b-timepicker>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <input
          class="input"
          type="text"
          placeholder="description"
          v-model="computedDescriptionText"
        >
      </div>
      <div class="column is-1">
        <span class="icon cstm has-text-success" style="margin-left: 1em;" @click="emitSave" :class="{'dontDisplay': isSaveDisable}">
          <i class="fas fa-2x fa-save"></i>
        </span>
        <span class="icon cstm has-text-danger is-pulled-right" @click="exitEditPane(id)">
          <i class="fas fa-2x fa-ban"></i>
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
.notification.is-editable {
  border: 0.032em solid hsl(217, 71%, 53%);
  background-color: #eee;
}
.columns.is-vcentered {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.icon.cstm {
  opacity: 0.2;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    opacity: 1;
  }
}
.icon.dontDisplay{
  display: none
}
.space-right {
  margin-left: 1em;
}
select,
.input,
.select {
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 0.5px solid #000;
  transition: border-color 0.6s linear;
  &:hover {
    border-bottom: 0.5px solid hsl(217, 71%, 53%);
  }
  &:focus {
    border-bottom: 0.5px solid hsl(217, 71%, 53%);
  }
}
</style>



<script>
export default {
  name: "EditableReminder",
  props: ["id", "dueDate", "descriptionText"],
  data() {
    return {
      reminderModal: {
        description: "",
        due: "",
        id: this.id
      },
      ddueDate: "",
      ddueTime: "",
      ddescriptionText: undefined
    };
  },
  methods: {
    exitEditPane(id) {
      this.$store.dispatch("exitEditField", id);
    },
    emitSave() {
      this.reminderModal.description = this.ddescriptionText || this.descriptionText
      if (this.ddueDate != "" && this.ddueTime != "") {
        this.reminderModal.due = `${this.ddueDate.getFullYear()}-${this.ddueDate.getMonth()+1}-${this.ddueDate.getDate()} ${this.ddueTime.getHours()}:${this.ddueTime.getMinutes()}` 
      }else if(this.ddueDate != ""){
        var dt = new Date(this.dueDate)
        this.reminderModal.due = `${this.ddueDate.getFullYear()}-${this.ddueDate.getMonth()+1}-${this.ddueDate.getDate()} ${dt.getHours()}:${dt.getMinutes()}` 
      }else if (this.ddueTime != "") {
        var dt = new Date(this.dueDate)
        this.reminderModal.due = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${this.ddueTime.getHours()}:${this.ddueTime.getMinutes()}` 
      }else{
        var dt = new Date(this.dueDate)
        this.reminderModal.due = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}` 
      }
      this.$emit("onReminderUpdated", this.reminderModal);
    }
  },
  computed: {
    computedTime: {
      get() {
        return new Date(this.dueDate);
      },
      set(newTime) {
        this.ddueTime = newTime
      }
    },
    computedDate: {
      get() {
        return new Date(this.dueDate)
      },
      set(newDate) {
        this.ddueDate = newDate
      }
    },
    computedDescriptionText: {
      get() {
        return this.ddescriptionText || this.descriptionText;
      },
      set(newDescription) {
        this.ddescriptionText = newDescription;
      }
    },
    isSaveDisable(){
      return false
      // return this.ddescriptionText == "" && this.ddueDate == "" && this.ddueTime == ""
    }
  }
};
</script>

