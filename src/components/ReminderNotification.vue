<template>
    <div class="notification is-warning" v-if="totalNotificationCount>0 && shouldShowNotification">
        <button class="delete" @click="hideNotification"></button>
        {{msgText}}
    </div>
</template>


<script>
export default {
    name: "ReminderNotification",
    props: ['msgText']
}
</script>
