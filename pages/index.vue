<template>
  <div class="container">
    <h1 class="text-center text-2xl m-4">IP Tracker</h1>
    <div class="flex space-x-4">
      <div class="space-y-4 text-gray-800 w-1/3">
        <div>
          <label for="client" class="inputlabel">Client</label>
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
          <label for="subject-matter" class="inputlabel">Subject Matter</label>
          <input
            id="subject-matter"
            v-model="newMatter.subjectMatter"
            type="text"
            name="subject-matter"
            placeholder="Subject Matter"
            class="textinput"
          />
        </div>
        <client-only>
          <div class="my-4">
            <label class="inputlabel">Filing Date</label>
            <v-date-picker
              v-model="newMatter.filingDate"
              :input-props="{
                class: 'textinput',
                placeholder: 'Filing Date',
              }"
            />
          </div>
          <div class="my-4">
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
      </div>
      <div class="w-1/3 space-y-4">
        <div>
          <label for="team" class="inputlabel">Team</label>
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
        <div>
          <label for="timeline" class="inputlabel">Timeline</label>
          <div
            v-for="(status, index) in newMatter.timeline"
            :key="index"
            class="flex flex-col space-y-4 mb-4"
          >
            <div class="md:flex items-center">
              <div class="md:w-1/6">
                <label for="action" class="sidelabel md:text-right"
                  >Action</label
                >
              </div>
              <div class="md:w-5/6">
                <input
                  v-model="status.action"
                  type="text"
                  placeholder="Action"
                  class="textinput w-full"
                />
              </div>
            </div>
            <div class="md:flex items-center">
              <div class="md:w-1/6">
                <label for="date" class="sidelabel md:text-right">Date</label>
              </div>
              <div class="md:w-5/6">
                <client-only>
                  <v-date-picker
                    v-model="status.doneOn"
                    :input-props="{
                      class: 'textinput',
                      placeholder: 'Date',
                    }"
                /></client-only>
              </div>
            </div>
            <div class="flex justify-end">
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
    </div>
    <button class="btn" @click="createMatter">Add Matter</button>
    <client-only>
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="$store.getters['GET_MATTERS']"
        :css="tablecss"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuetable from 'vuetable-2'

interface Status {
  action: string
  doneOn?: Date
}

interface Deadline {
  action: string
  dueDate?: Date
}

interface IPMatter {
  id: string
  client: string
  subjectMatter: string
  applicationNo?: string
  registrationNo?: string
  filingDate?: Date
  registrationDate?: Date
  timeline: Status[]
  deadlines: Deadline[]
  team: string[]
}

const testMatter = {
  id: '123',
  client: 'test',
  subjectMatter: 'test',
  timeline: [{ action: 'testAction', doneOn: new Date(Date.now()) }],
  deadlines: [
    {
      action: 'test action',
      dueDate: new Date(Date.now()),
    },
  ],
  team: ['DAF', 'DKCM'],
}

const matters: IPMatter[] = []
matters.push(testMatter)

export default Vue.extend({
  components: { Vuetable },
  data() {
    const timeline: Status[] = [{ action: '' }]
    const team: string[] = []
    return {
      matters,
      newMatter: {
        client: '',
        subjectMatter: '',
        team,
        timeline,
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
          name: 'timeline',
          title: 'Timeline',
          formatter: this.timelineFormat,
        },
        {
          name: 'deadlines',
          title: 'Deadlines',
          // formatter: this.timelineFormat,
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
      await this.$store.dispatch('ADD_MATTER', this.newMatter)
      this.resetNewMatter()
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
    deleteStatus(index: number) {
      this.newMatter.timeline.splice(index, 1)
    },
    addLawyer(newLawyer: string) {
      this.newMatter.team.push(newLawyer.toUpperCase())
    },
    resetNewMatter() {
      const timeline: Status[] = [{ action: '' }]
      const team: string[] = []
      this.newMatter = {
        client: '',
        subjectMatter: '',
        team,
        timeline,
      }
    },
    dateFormat(date: string) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return date ? new Date(date).toLocaleDateString('en-GB', options) : '-'
    },
    timelineFormat(timeline: Status[]) {
      return timeline
        .map(
          (status) =>
            `${
              status.doneOn || status.dueDate
                ? this.dateFormat(status.doneOn ?? status.dueDate)
                : ''
            }: ${status.action}`
        )
        .join('\n-\n')
    },
    teamFormat(team: string[]) {
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
