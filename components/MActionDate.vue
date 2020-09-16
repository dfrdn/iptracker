<template>
  <div>
    <label :for="label" class="toplabel">{{ labelTitle }}</label>
    <div
      v-for="(action, index) in actions"
      :key="index"
      class="flex flex-col space-y-4 mb-4"
    >
      <div class="md:flex items-center">
        <div class="w-full md:w-1/4">
          <label :for="actionLabel" class="sidelabel text-right mb-2">{{
            actionLabelTitle
          }}</label>
        </div>
        <div class="md:w-3/4">
          <input
            v-model="action[actionLabel]"
            type="text"
            :placeholder="actionLabelTitle"
            class="textinput w-full"
          />
        </div>
      </div>
      <div class="md:flex items-center">
        <div class="md:w-1/4">
          <label for="date" class="sidelabel text-right mb-2">{{
            dateLabelTitle
          }}</label>
        </div>
        <div class="md:w-3/4">
          <client-only>
            <v-date-picker
              v-model="action[dateLabel]"
              :input-props="{
                class: 'textinput',
                placeholder: dateLabelTitle,
              }"
            />
          </client-only>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <m-button
          v-if="index > 0"
          class="w-1/2"
          color="red"
          @click.native="deleteAction(index)"
        >
          Delete Deadline
        </m-button>
        <m-button class="w-1/2" @click.native="addAction">
          New {{ labelTitle }}
        </m-button>
      </div>
    </div>
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
      type: Array,
      default: () => [],
    },
    actionLabel: {
      type: String,
      default: 'action',
    },
    dateLabel: {
      type: String,
      default: 'date',
    },
  },
  computed: {
    labelTitle() {
      return _.startCase(this.label)
    },
    actionLabelTitle() {
      return _.startCase(this.actionLabel)
    },
    dateLabelTitle() {
      return _.startCase(this.dateLabel)
    },
    actions: {
      get() {
        return this.value
      },
      set(actions) {
        this.$emit('input', actions)
      },
    },
  },
  methods: {
    addAction() {
      this.actions.push({ action: '' })
    },
    deleteAction(index) {
      this.actions.splice(index, 1)
    },
  },
})
</script>

<style lang="scss" scoped>
.textinput {
  @apply block w-full rounded shadow px-4 py-2;
}

.toplabel,
.sidelabel {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold;
}

.toplabel {
  @apply mb-2;
}

.sidelabel {
  @apply mr-2;
}
</style>
