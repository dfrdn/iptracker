<template>
  <div class="container space-y-8 p-4">
    <h1 class="text-center text-4xl">IP Tracker</h1>
    <div
      class="flex flex-col md:flex-row md:items-start space-y-4 md:space-x-4 md:space-y-0"
    >
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 w-full md:w-1/2"
      >
        <m-text-input v-model="newMatter.client" label="client" />
        <m-text-input
          v-model="newMatter.subjectMatter"
          label="subject-matter"
        />
        <m-text-input
          v-model="newMatter.applicationNo"
          label="application-number"
        />
        <m-date-input v-model="newMatter.filingDate" label="filing-date" />
        <m-text-input
          v-model="newMatter.registrationNo"
          label="registration-number"
        />
        <m-date-input
          v-model="newMatter.registrationDate"
          label="registration-date"
        />
        <m-multiselect
          v-model="newMatter.team"
          label="team"
          :options="$store.getters['GET_LAWYERS']"
        />
      </div>
      <div class="w-full md:w-1/4 space-y-4">
        <m-action-date
          v-model="newMatter.timeline"
          label="timeline"
          date-label="doneOn"
        />
      </div>
      <div class="md:w-1/4 space-y-4">
        <m-action-date
          v-model="newMatter.deadlines"
          label="deadlines"
          date-label="dueDate"
        />
      </div>
    </div>
    <pre>{{ $v }}</pre>
    <m-button
      class="block mx-auto w-1/2"
      color="green"
      @click.native="createMatter"
    >
      Add Matter
    </m-button>
    <m-table :data="$store.getters['GET_MATTERS']"></m-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'

export default Vue.extend({
  data() {
    return {
      newMatter: {
        client: '',
        subjectMatter: '',
        team: [],
        timeline: [{ action: '' }],
        deadlines: [{ action: '' }],
      },
    }
  },
  validations: {
    newMatter: {
      client: {
        required,
      },
      subjectMatter: {
        required,
      },
      team: {
        required,
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('LOAD_MATTERS')
  },
  methods: {
    async createMatter() {
      const newMatter = this.resetNewMatter()
      await this.$store.dispatch('ADD_MATTER', newMatter)
      await this.$store.dispatch('LOAD_MATTERS')
    },
    async getAllMatters() {
      await this.$store.dispatch('LOAD_MATTERS')
    },
    async updateMatter() {},
    async deleteMatter() {},
    addStatus() {
      this.newMatter.timeline.push({ action: '' })
    },
    resetNewMatter() {
      const newMatter = { ...this.newMatter }
      this.newMatter = {
        client: '',
        subjectMatter: '',
        team: [],
        timeline: [{ action: '' }],
        deadlines: [{ action: '' }],
      }
      return newMatter
    },
  },
})
</script>

<style lang="scss">
.textinput {
  @apply block w-full rounded shadow px-4 py-2;
}

.inputlabel,
.sidelabel {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold;
}

.inputlabel {
  @apply mb-2;
}

.sidelabel {
  @apply mr-2;
}
</style>
