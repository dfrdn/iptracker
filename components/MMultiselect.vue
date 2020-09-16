<template>
  <div>
    <label :for="label" class="toplabel">{{ labelTitle }}</label>
    <multiselect
      v-model="team"
      :options="options"
      :placeholder="labelTitle"
      :multiple="true"
      :taggable="true"
      tag-placeholder="Press enter to add"
      @tag="addOption"
    />
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
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    team: {
      get() {
        return this.value
      },
      set(team) {
        this.$emit('input', team)
      },
    },
    labelTitle() {
      return _.startCase(this.label)
    },
  },
  methods: {
    addOption(newOption) {
      this.value.push(newOption)
    },
  },
})
</script>

<style lang="scss">
.toplabel {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
}

.multiselect__tags {
  @apply shadow px-4;
  @apply text-base text-gray-800;
}
.multiselect__placeholder {
  @apply text-base text-gray-500 m-0 p-0;
}
</style>
