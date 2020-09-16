<template>
  <client-only>
    <vuetable
      ref="vuetable"
      :api-mode="false"
      :fields="fields"
      :data="data"
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
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'

export default Vue.extend({
  components: {
    Vuetable,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
  methods: {
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
