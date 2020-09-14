export const state = () => ({
  matters: [],
})

export const getters = {
  GET_MATTERS(state) {
    return state.matters
  },
  GET_LAWYERS(state) {
    console.log(state.matters.map((m) => m.team))
    const lawyers = [...new Set(state.matters.map((m) => m.team).flat())]
    console.log(lawyers.flat())
    return lawyers.flat()
  },
}

export const mutations = {
  SET_MATTERS(state, matters) {
    state.matters = matters
  },
  ADD_MATTER(state, matter) {
    state.matters.push(matter)
  },
}

export const actions = {
  async LOAD_MATTERS({ commit }) {
    const res = await fetch('/api/iptracker-crud', {
      method: 'GET',
    })
    const matters = (await res.json()).map(({ data }) => data)
    commit('SET_MATTERS', matters)
  },
  async ADD_MATTER({ commit }, newMatter) {
    await fetch('/api/iptracker-crud', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMatter),
    })

    commit('ADD_MATTER', newMatter)
  },
}
