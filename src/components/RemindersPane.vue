<template>
    <div>
        <ReminderMenu></ReminderMenu>
        <br>
        <ReminderSearch></ReminderSearch>
        <br>
        <Reminders></Reminders>
    </div>
</template>


<style lang="scss" scoped>

</style>


<script>
import ReminderMenu from '@/components/ReminderMenu.vue'
import ReminderSearch from '@/components/ReminderSearch.vue'
import Reminders from '@/components/Reminders.vue'
export default {
    name: "RemindersPane",
    components: {
        ReminderMenu,
        ReminderSearch,
        Reminders
    }
}
</script>
