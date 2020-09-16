<template>
  <div>
    <label :for="label" class="toplabel">{{ labelTitle }}</label>
    <input
      :value="value"
      type="text"
      :name="label"
      :placeholder="labelTitle"
      class="textinput"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    labelTitle() {
      return _.startCase(this.label)
    },
  },
})
</script>

<style lang="scss" scoped>
.toplabel {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
}
.textinput {
  @apply block w-full rounded shadow px-4 py-2;
}
</style>
