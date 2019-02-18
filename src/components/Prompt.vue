<template>
    <div class="modal" :class="{'is-active': isShow}">
    <div class="modal-background" @click="dismissPrompt"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{promptTitle}}</p>
                <button class="delete" aria-label="close" @click="dismissPrompt"></button>
            </header>
        <section class="modal-card-body">
            <slot></slot>
        </section>
        <footer class="modal-card-foot">
            <button class="button" :class="promptOkBtnClass" @click="okBtnClicked">{{promptOkBtn}}</button>
            <button class="button" @click="dismissPrompt">Cancel</button>
        </footer>
    </div>
    </div>
</template>


<script>
export default {
    name: "Prompt",
    props:{
        isShow: Boolean,
        promptTitle: String,
        promptOkBtn: String,
        promptOkBtnClass: String
    },
    methods: {
        dismissPrompt(){
            this.$emit('dismissed')
        },
        okBtnClicked(){
            this.$emit('approved')
        }
    }
}
</script>
