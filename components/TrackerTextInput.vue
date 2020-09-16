<template>
  <div>
    <label for="client" class="inputlabel">Client*</label>
    <input
      id="client"
      v-model="newMatter.client"
      type="text"
      name="client"
      placeholder="Client"
      class="textinput"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'top',
    },
  },
})
</script>

<style scoped></style>
