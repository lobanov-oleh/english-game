import robots from '../../robots'

const state = {
  inProcess: false,
  robots: []
}

// getters
const getters = {
}

// actions
const actions = {
  start({ commit }) {
    commit('inProcess', true)

    const arrRobots = []
    for (const k in robots) {
      arrRobots.push(JSON.parse(JSON.stringify(robots[k])))
    }
    commit('robots', arrRobots)
  },
  stop({ commit }) {
    commit('inProcess', false)
    commit('robots', [])
  },
  delRobot({ commit }, id) {
    commit('delRobot', id)
  }
}

// mutations
const mutations = {
  inProcess(state, value) {
    state.inProcess = value
  },
  robots(state, robots) {
    state.robots = robots
  },
  delRobot(state, id) {
    for (let k in state.robots) {
      if (id === state.robots[k].id) {
        state.robots.splice(k, 1)
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