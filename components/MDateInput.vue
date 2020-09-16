<template>
  <div>
    <label class="toplabel">{{ labelTitle }}</label>
    <client-only>
      <v-date-picker
        v-model="date"
        :input-props="{
          class: 'textinput',
          placeholder: labelTitle,
        }"
      />
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(date) {
        this.$emit('input', date)
      },
    },
    labelTitle() {
      return _.startCase(this.label)
    },
  },
})
</script>

<style lang="scss" scoped>
.toplabel {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold;
}
.toplabel {
  @apply mb-2;
}
.textinput {
  @apply block w-full rounded shadow px-4 py-2;
}
</style>
