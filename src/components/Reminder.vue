<template>
    <tbody>
        <tr v-for="(reminder, index) in filteredReminder" :key="reminder.id">
            <td>{{index}}</td>
            <td>{{reminder.date}}</td>
            <td>{{processDescription(reminder.description)}}</td>
            <td>
                <span class="icon done">
                    <i class="fas fa-check fa-lg" @click="markDone(reminder)"></i>
                </span>
                &nbsp;
                <span class="icon trash">
                    <i class="fas fa-trash fa-lg" @click="markDelete(reminder)"></i>
                </span>
            </td>
        </tr>
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
    </tbody>
</template>

<style lang="scss" scoped>
.icon{
    opacity: 0.2;
    cursor: pointer;
    transition: all 1s;
}
.icon:hover{
    opacity: 1;
}
.done:hover{
    color: hsl(141, 71%, 48%);
}
.trash:hover{
    color: hsl(348, 100%, 61%)
}
</style>



<script>
import Prompt from "@/components/Prompt.vue";
export default {
    name: "Reminder",
    components: {
        Prompt
    },
    computed : {
        filteredReminder(){
            return this.$store.state.reminders.filter(rem => rem.description.toLowerCase().match(this.$store.state.searchKeyword.toLowerCase()))
        }
    },
    data(){
        return {
            showDeletePrompt: false,
            deletingReminderDescription: "",
            deletingReminderId: ''
        }
    },
    methods:{
        processDescription(desc){
            if (desc.length > 100) {
                return `${desc.substring(0, 100)}...`
            }
            return desc
        },
        markDone(reminder){
            
        },
        markDelete(reminder){
            this.showDeletePrompt = true
            this.deletingReminderDescription = reminder.description
            this.deletingReminderId = reminder.id
        },
        deleteReminderPropmptDismissed(){
            this.showDeletePrompt = false
            this.deletingReminderDescription = ""
            this.deletingReminderId = ""
        },
        deleteReminderPropmptConfirmedDeletion(id){
            this.$store.dispatch("deleteReminder", id);
            this.deleteReminderPropmptDismissed()
        }
    }
}
</script>

