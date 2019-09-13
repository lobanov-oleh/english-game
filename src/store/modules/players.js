const state = {
  defenderRobots: [],
  attackerRobots: [],
}

const getters = {
}

const actions = {
  start({ commit }) {
    commit('defenderRobots', [])
    commit('attackerRobots', [])
  },
  addDefenderRobot({ commit }, robot) {
    commit('addDefenderRobot', robot)
  },
  addAttackerRobot({ commit }, robot) {
    commit('addAttackerRobot', robot)
  },
  delDefenderRobot({ commit }, id) {
    commit('delDefenderRobot', id)
  },
  delAttackerRobot({ commit }, id) {
    commit('delAttackerRobot', id)
  }
}

const mutations = {
  defenderRobots(state, robots) {
    state.defenderRobots = robots
  },
  attackerRobots(state, robots) {
    state.attackerRobots = robots
  },
  addDefenderRobot(state, robot) {
    state.defenderRobots.push(robot)
  },
  addAttackerRobot(state, robot) {
    state.attackerRobots.push(robot)
  },
  delDefenderRobot(state, id) {
    for (let k in state.defenderRobots) {
      if (id === state.defenderRobots[k].id) {
        state.defenderRobots.splice(k, 1)
        break
      }
    }
  },
  delAttackerRobot(state, id) {
    for (let k in state.attackerRobots) {
      if (id === state.attackerRobots[k].id) {
        state.attackerRobots.splice(k, 1)
        break
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}