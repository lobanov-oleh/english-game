const state = {
  defenderRobot: false,
  attackerRobot: false,
}

// getters
const getters = {
}

// actions
const actions = {
  set({ commit }, { who, robot }) {
    commit(who + 'Robot', robot)
  },
  decrease({ state, commit }, { who, what }) {
    const robot = state[who + 'Robot']
    robot[what]--
    commit(who + 'Robot', robot)
  }
}

// mutations
const mutations = {
  defenderRobot(state, robot) {
    state.defenderRobot = robot
  },
  attackerRobot(state, robot) {
    state.attackerRobot = robot
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}