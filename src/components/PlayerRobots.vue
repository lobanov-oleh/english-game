<template>
  <v-card>
    <v-card-title>
      <h2>{{ who }}</h2>
    </v-card-title>

    <v-container fluid>
      <v-row v-for="r in robots" :key="r.id" @click="battleSet({who, robot: r})">
        <robot-component :robot="r" :height="100"></robot-component>
        <v-col v-if="battleRobot && r.id === battleRobot.id" class="d-flex child-flex" cols="12">
          <v-alert type="success">Ready for battle!</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RobotComponent from "./Robot";

export default {
  name: "PlayerRobots",
  props: ["who"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      defenderRobots: state => state.players.defenderRobots,
      attackerRobots: state => state.players.attackerRobots,
      battledefenderRobot: state => state.battle.defenderRobot,
      battleattackerRobot: state => state.battle.attackerRobot
    }),
    robots: function() {
      return this[this.who + "Robots"];
    },
    battleRobot: function() {
      return this["battle" + this.who + "Robot"];
    }
  },
  methods: {
    ...mapActions({
      battleSet: "battle/set"
    })
  },
  components: {
    "robot-component": RobotComponent
  }
};
</script>
