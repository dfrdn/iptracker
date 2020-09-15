<template>
  <div class="container space-y-8 p-4">
    <h1 class="text-center text-4xl">IP Tracker</h1>
    <div class="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 w-full md:w-1/2"
      >
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
        <div>
          <label for="subject-matter" class="inputlabel">Subject Matter*</label>
          <input
            id="subject-matter"
            v-model="newMatter.subjectMatter"
            type="text"
            name="subject-matter"
            placeholder="Subject Matter"
            class="textinput"
          />
        </div>
        <div>
          <label class="inputlabel">Application No.</label>
          <input
            id="application-number"
            v-model="newMatter.applicationNo"
            type="text"
            name="application-number"
            placeholder="Application Number"
            class="textinput"
          />
        </div>
        <client-only>
          <div>
            <label class="inputlabel">Filing Date</label>
            <v-date-picker
              v-model="newMatter.filingDate"
              :input-props="{
                class: 'textinput',
                placeholder: 'Filing Date',
              }"
            />
          </div>
          <div class="">
            <label class="inputlabel">Registration No.</label>
            <input
              id="registration-number"
              v-model="newMatter.registrationNo"
              type="text"
              name="registration-number"
              placeholder="Registration Number"
              class="textinput"
            />
          </div>
          <div class="">
            <label class="inputlabel">Registration Date</label>
            <v-date-picker
              v-model="newMatter.registrationDate"
              :input-props="{
                class: 'textinput',
                placeholder: 'Registration Date',
              }"
            />
          </div>
        </client-only>
        <div>
          <label for="team" class="inputlabel">Team*</label>
          <multiselect
            v-model="newMatter.team"
            :options="$store.getters['GET_LAWYERS']"
            placeholder="Team"
            :multiple="true"
            :taggable="true"
            tag-placeholder="Press enter to add lawyer"
            @tag="addLawyer"
          />
        </div>
      </div>
      <div class="w-full md:w-1/4 space-y-4">
        <div>
          <label for="timeline" class="inputlabel">Timeline</label>
          <div
            v-for="(status, index) in newMatter.timeline"
            :key="index"
            class="flex flex-col space-y-4 mb-4"
          >
            <div class="md:flex items-center">
              <div class="w-full md:w-1/4">
                <label for="action" class="sidelabel text-right mb-2"
                  >Action</label
                >
              </div>
              <div class="w-full md:w-3/4">
                <input
                  v-model="status.action"
                  type="text"
                  placeholder="Action"
                  class="textinput w-full"
                />
              </div>
            </div>
            <div class="md:flex items-center">
              <div class="md:w-1/4">
                <label for="date" class="sidelabel text-right mb-2">Date</label>
              </div>
              <div class="md:w-3/4">
                <client-only>
                  <v-date-picker
                    v-model="status.doneOn"
                    :input-props="{
                      class: 'textinput',
                      placeholder: 'Date',
                    }"
                  />
                </client-only>
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <button
                v-if="index > 0"
                class="delete-btn w-1/2"
                @click="deleteStatus(index)"
              >
                Delete Status
              </button>
              <button class="btn w-1/2" @click="addStatus">New Status</button>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/4 space-y-4">
        <div>
          <label for="deadlines" class="inputlabel">Deadlines</label>
          <div
            v-for="(deadline, index) in newMatter.deadlines"
            :key="index"
            class="flex flex-col space-y-4 mb-4"
          >
            <div class="md:flex items-center">
              <div class="w-full md:w-1/4">
                <label for="action" class="sidelabel text-right mb-2"
                  >Action</label
                >
              </div>
              <div class="md:w-3/4">
                <input
                  v-model="deadline.action"
                  type="text"
                  placeholder="Action"
                  class="textinput w-full"
                />
              </div>
            </div>
            <div class="md:flex items-center">
              <div class="md:w-1/4">
                <label for="date" class="sidelabel text-right mb-2"
                  >Due Date</label
                >
              </div>
              <div class="md:w-3/4">
                <client-only>
                  <v-date-picker
                    v-model="deadline.dueDate"
                    :input-props="{
                      class: 'textinput',
                      placeholder: 'Due Date',
                    }"
                  />
                </client-only>
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <button
                v-if="index > 0"
                class="delete-btn w-1/2"
                @click="deleteDeadline(index)"
              >
                Delete Deadline
              </button>
              <button class="btn w-1/2" @click="addDeadline">
                New Deadline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="btn block mx-auto w-1/2" @click="createMatter">
      Add Matter
    </button>
    <client-only>
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="$store.getters['GET_MATTERS']"
        :css="tablecss"
      >
        <template slot="timeline-slot" slot-scope="props">
          <div class="divide-y">
            <div
              v-for="(status, index) in props.rowData.timeline"
              :key="index"
              class="py-2"
            >
              <h3 class="font-semibold">{{ dateFormat(status.doneOn) }}</h3>
              <p>{{ status.action }}</p>
            </div>
          </div>
        </template>
        <template slot="deadlines-slot" slot-scope="props">
          <div class="divide-y">
            <div
              v-for="(deadline, index) in props.rowData.deadlines"
              :key="index"
              class="py-2"
            >
              <h3 class="font-semibold">{{ dateFormat(deadline.dueDate) }}</h3>
              <p>{{ deadline.action }}</p>
            </div>
          </div>
        </template>
      </vuetable>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'

export default Vue.extend({
  components: { Vuetable },
  data() {
    return {
      newMatter: {
        client: '',
        subjectMatter: '',
        team: [],
        timeline: [{ action: '' }],
        deadlines: [{ action: '' }],
      },
      // eslint-disable-next-line dot-notation
      lawyers: this.$store.getters['GET_LAWYERS'],
      tablecss: {
        tableWrapper: 'shadow w-full divide-y divide-gray-200 overflow-x-auto',
        tableBodyClass: 'bg-white',
      },
      fields: [
        {
          name: 'client',
          title: 'Client',
        },
        {
          name: 'subjectMatter',
          title: 'Subject Matter',
        },
        {
          name: 'applicationNo',
          title: 'Application No.',
        },
        {
          name: 'registrationNo',
          title: 'Registration No.',
        },
        {
          name: 'filingDate',
          title: 'Filing Date',
          formatter: this.dateFormat,
        },
        {
          name: 'registrationDate',
          title: 'Registration Date',
          formatter: this.dateFormat,
        },
        {
          name: 'timeline-slot',
          title: 'Timeline',
        },
        {
          name: 'deadlines-slot',
          title: 'Deadlines',
        },
        {
          name: 'team',
          title: 'Team',
          formatter: this.teamFormat,
        },
      ],
    }
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
    deleteStatus(index) {
      this.newMatter.timeline.splice(index, 1)
    },
    addDeadline() {
      this.newMatter.deadlines.push({ action: '' })
    },
    deleteDeadline(index) {
      this.newMatter.deadlines.splice(index, 1)
    },
    addLawyer(newLawyer) {
      this.newMatter.team.push(newLawyer.toUpperCase())
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
    dateFormat(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date ? new Date(date).toLocaleDateString('en-GB', options) : '-'
    },
    teamFormat(team) {
      return team.join(', ')
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

.multiselect__tags {
  @apply shadow px-4;
  @apply text-base text-gray-800;
}
.multiselect__placeholder {
  @apply text-base text-gray-500 m-0 p-0;
}

.btn {
  @apply rounded-full bg-blue-600 text-blue-100 px-4 py-2 shadow transition-shadow duration-300 ease-in-out;
  &:hover {
    @apply shadow-lg;
  }
  &:focus {
    @apply shadow-outline outline-none;
  }
  &:active {
    @apply bg-blue-900 shadow;
  }
}

.delete-btn {
  @apply rounded-full bg-red-600 text-red-100 px-4 py-2 shadow transition-shadow duration-300 ease-in-out;
  &:hover {
    @apply shadow-lg;
  }
  &:focus {
    @apply shadow-outline outline-none;
  }
  &:active {
    @apply bg-red-900 shadow;
  }
}

table {
  tbody {
    & > * + * {
      @apply border-t border-gray-200;
    }
    td {
      @apply px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700;
    }
  }
  thead {
    th {
      @apply px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider;
    }
  }
}
</style>
