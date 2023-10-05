<template>
  <button
    type="button"
    class="pilot-button"
    :disabled="props.disabled"
  >
  <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.pilot-button {
  padding: 10px 22px;
    color: #00A76B;
    text-decoration: none;
    background: none;
    border: 1px solid #00A76B;
    border-radius: 22px;

    @media screen and (min-width: 768px){
      padding: 10px 18px;
      border-radius: 30px;
    }

    @media screen and (min-width: 1024px){
      padding: 6px 10px;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }

    &:disabled {
      opacity: 0.5;
      cursor: none;
      pointer-events: none;
    }
}
</style>
