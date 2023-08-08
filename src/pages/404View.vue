<template>
    <PilotMainContainer class="error-view__container">
        <div class="error-view">
            <div class="error-view__title">
                404 - такой страницы не существует
            </div>
            <router-link to="/" class="error-view__link">перейти на главную</router-link>
        </div>
    </PilotMainContainer>
</template>

<script setup lang="ts">
import PilotMainContainer from '../shared/ui/PilotMainContainer.vue'

</script>

<style lang="scss" scoped>
.error-view {
    &__container {
        padding: 20px;
        min-height: calc(100dvh - 149px);
    }
    &__title {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 40px;
        line-height: 56px;
    }
    &__link {
        color: #00a76b;
        font-weight: 400;
        font-size: 22px;
        line-height: 28px;
        text-decoration: none;

        &:active {
            color: #00a76b;
        }
    }
}
</style>