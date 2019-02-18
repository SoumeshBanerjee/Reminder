<template>
    <table class="table is-fullwidth is-hoverable">
        <thead>
            <tr>
                <th>#</th>
                <th>Time</th>
                <th>Description</th>
                <th></th>
            </tr>
        </thead>
        <Reminder></Reminder>
    </table>
</template>

<script>
import Reminder from '@/components/Reminder.vue'
export default {
    name: "Reminders",
    components: {
        Reminder
    }
}
</script>