<template>
  <button class="btn" :class="colorClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'blue',
    },
  },
  computed: {
    colorClass() {
      return `bg-${this.color}-600 text-${this.color}-100 active:bg-${this.color}-900`
    },
  },
})
</script>

<style lang="scss" scoped>
.btn {
  @apply rounded-full  px-4 py-2 shadow transition-shadow duration-300 ease-in-out;
  &:hover {
    @apply shadow-lg;
  }
  &:focus {
    @apply shadow-outline outline-none;
  }
  &:active {
    @apply shadow;
  }
}
</style>
