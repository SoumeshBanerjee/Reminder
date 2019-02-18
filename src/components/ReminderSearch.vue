<template>
    <div class="field">
        <p class="control has-icons-left has-icons-right">
            <input class="input" type="text" placeholder="Search" v-model="$store.state.searchKeyword">
            <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
        </p>
    </div>
</template>


<script>
export default {
    name: "ReminderSearch"
}
</script>
