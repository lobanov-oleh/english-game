<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>English</span>
        <span class="font-weight-light">ROBOTS BATTLE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!gameInProcess" text @click="start">
        <span class="mr-2">Start!</span>
      </v-btn>
      <v-btn v-if="gameInProcess" text @click="battle">
        <span class="mr-2">Battle!</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-img v-if="!gameInProcess" src="/images/app.jpg"></v-img>

      <v-row v-if="!!gameRobots.length">
        <v-col cols="12">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="r in gameRobots"
                :key="r.id"
                class="d-flex child-flex"
                cols="4"
                @click="showRobot(r)"
              >
                <robot-component :robot="r" :showPassword="false" :height="200"></robot-component>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <v-row v-if="!!defenderRobots.length || !!attackerRobots.length">
        <v-col v-if="!!defenderRobots.length" cols="6">
          <player-robots-component who="defender"></player-robots-component>
        </v-col>
        <v-col v-if="!!attackerRobots.length" cols="6">
          <player-robots-component who="attacker"></player-robots-component>
        </v-col>
      </v-row>
    </v-content>

    <v-dialog v-model="robotDialog" width="500">
      <v-card v-if="!!robot">
        <v-card-text class="pt-5">
          <robot-component :robot="robot"></robot-component>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="toDefender">To defender</v-btn>
          <v-btn color="primary" text @click="toAttacker">To attacker</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="toDeactivate">Deactivate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="battleDialog" width="500">
      <v-card v-if="battleDefenderRobot && battleAttackerRobot">
        <v-card-text>
          <v-row>
            <v-col class="d-flex child-flex" cols="6">
              <robot-component :robot="battleDefenderRobot" :showPassword="false"></robot-component>
            </v-col>
            <v-col class="d-flex child-flex" cols="6">
              <robot-component :robot="battleAttackerRobot" :showPassword="false"></robot-component>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="winDefender">Defender win</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="winAttacker">Attacker win</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PlayerRobotsComponent from "./components/PlayerRobots";
import RobotComponent from "./components/Robot";

export default {
  name: "App",
  data() {
    return {
      robotDialog: false,
      robot: null,
      battleDialog: false
    };
  },
  computed: mapState({
    gameInProcess: state => state.game.inProcess,
    gameRobots: state => state.game.robots,
    defenderRobots: state => state.players.defenderRobots,
    attackerRobots: state => state.players.attackerRobots,
    battleDefenderRobot: state => state.battle.defenderRobot,
    battleAttackerRobot: state => state.battle.attackerRobot
  }),
  methods: {
    ...mapActions({
      gameStart: "game/start",
      playersStart: "players/start",
      gameDelRobot: "game/delRobot",
      defenderAddRobot: "players/addDefenderRobot",
      defenderDelRobot: "players/delDefenderRobot",
      attackerAddRobot: "players/addAttackerRobot",
      attackerDelRobot: "players/delAttackerRobot",
      battleSet: "battle/set"
    }),
    start: function() {
      this.gameStart();
      this.playersStart();
    },
    showRobot: function(robot) {
      this.robot = robot;
      this.robotDialog = true;
    },
    toDefender: function() {
      this.defenderAddRobot(this.robot);
      this.gameDelRobot(this.robot.id);

      this.robotDialog = false;
      this.robot = null;
    },
    toAttacker: function() {
      this.attackerAddRobot(this.robot);
      this.gameDelRobot(this.robot.id);

      this.robotDialog = false;
      this.robot = null;
    },
    toDeactivate: function() {
      this.gameDelRobot(this.robot.id);

      this.robotDialog = false;
      this.robot = null;
    },
    battle: function() {
      if (this.battleDefenderRobot && this.battleAttackerRobot) {
        this.battleDialog = true;
      }
    },
    winDefender: function() {
      this.attackerDelRobot(this.battleAttackerRobot.id);
      this.battleDialog = false;
      this.battleSet({ who: "defender", robot: false });
      this.battleSet({ who: "attacker", robot: false });
    },
    winAttacker: function() {
      this.defenderDelRobot(this.battleDefenderRobot.id);
      this.battleDialog = false;
      this.battleSet({ who: "defender", robot: false });
      this.battleSet({ who: "attacker", robot: false });
    }
  },
  components: {
    "player-robots-component": PlayerRobotsComponent,
    "robot-component": RobotComponent
  }
};
</script>
