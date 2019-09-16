import Vue from 'vue'
import Vuex from 'vuex'
import battle from './modules/battle'
import game from './modules/game'
import players from './modules/players'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    battle,
    game,
    players
  },
})