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
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col v-for="r in gameRobots" :key="r.id" class="d-flex child-flex" cols="4">
                  <v-card flat tile>
                    <v-img
                      :src="`/images/robots/${r.id}/${r.id}.jpg`"
                      contain
                      height="300"
                      @click="showRobot(r)"
                    ></v-img>
                    <v-card-text>
                      <h3>Initiative: {{ r.i }}</h3>
                      <h3>Attack: {{ r.a }}</h3>
                      <h3>Shield: {{ r.s }}</h3>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="!!defenderRobots.length || !!attackerRobots.length">
        <v-col v-if="!!defenderRobots.length" cols="6">
          <v-card>
            <v-card-title>
              <h2>Defender</h2>
            </v-card-title>
            <v-container fluid>
              <v-row v-for="r in defenderRobots" :key="r.id">
                <v-col class="d-flex child-flex" cols="6">
                  <v-card flat tile class="d-flex" @click="battleDefenderRobot = r">
                    <v-img :src="`/images/robots/${r.id}/${r.id}.jpg`" height="100" contain></v-img>
                  </v-card>
                </v-col>
                <v-col class="d-flex child-flex" cols="6">
                  <v-card flat tile class="d-flex">
                    <v-img :src="`/images/robots/${r.id}/password.jpg`" height="100" contain></v-img>
                  </v-card>
                </v-col>
                <v-col
                  v-if="battleDefenderRobot && r.id === battleDefenderRobot.id"
                  class="d-flex child-flex"
                  cols="12"
                >
                  <v-alert type="success">Ready for battle!</v-alert>
                </v-col>
                <v-col cols="3">
                  <h3>Initiative: {{ r.i }}</h3>
                </v-col>
                <v-col cols="3">
                  <h3>Attack: {{ r.a }}</h3>
                </v-col>
                <v-col cols="3">
                  <h3>Shield: {{ r.s }}</h3>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col v-if="!!attackerRobots.length" cols="6">
          <v-card>
            <v-card-title>
              <h2>Attacker</h2>
            </v-card-title>
            <v-container fluid>
              <v-row v-for="r in attackerRobots" :key="r.id">
                <v-col class="d-flex child-flex" cols="6">
                  <v-card flat tile class="d-flex" @click="battleAttackerRobot = r">
                    <v-img :src="`/images/robots/${r.id}/${r.id}.jpg`" height="100" contain></v-img>
                  </v-card>
                </v-col>
                <v-col class="d-flex child-flex" cols="6">
                  <v-card flat tile class="d-flex">
                    <v-img :src="`/images/robots/${r.id}/password.jpg`" height="100" contain></v-img>
                  </v-card>
                </v-col>
                <v-col
                  v-if="battleAttackerRobot && r.id === battleAttackerRobot.id"
                  class="d-flex child-flex"
                  cols="12"
                >
                  <v-alert type="success">Ready for battle!</v-alert>
                </v-col>
                <v-col cols="3">
                  <h3>Initiative: {{ r.i }}</h3>
                </v-col>
                <v-col cols="3">
                  <h3>Attack: {{ r.a }}</h3>
                </v-col>
                <v-col cols="3">
                  <h3>Shield: {{ r.s }}</h3>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-content>

    <v-dialog v-model="robotDialog" width="500">
      <v-card v-if="!!robot">
        <v-card-text>
          <v-row>
            <v-col class="d-flex child-flex" cols="6">
              <v-card flat tile class="d-flex">
                <v-img :src="`/images/robots/${robot.id}/${robot.id}.jpg`" height="300" contain></v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="6">
              <v-card flat tile class="d-flex">
                <v-img :src="`/images/robots/${robot.id}/password.jpg`" height="300" contain></v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <h3>Initiative: {{ robot.i }}</h3>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <h3>Attack: {{ robot.a }}</h3>
            </v-col>
            <v-col class="d-flex child-flex" cols="4">
              <h3>Shield: {{ robot.s }}</h3>
            </v-col>
          </v-row>
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
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`/images/robots/${battleDefenderRobot.id}/${battleDefenderRobot.id}.jpg`"
                  height="300"
                  contain
                ></v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="6">
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`/images/robots/${battleAttackerRobot.id}/${battleAttackerRobot.id}.jpg`"
                  height="300"
                  contain
                ></v-img>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="6">
              <v-card flat tile class="d-flex">
                <v-card-text>
                  <h3>Initiative: {{ battleDefenderRobot.i }}</h3>
                  <h3>Attack: {{ battleDefenderRobot.a }}</h3>
                  <h3>Shield: {{ battleDefenderRobot.s }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col class="d-flex child-flex" cols="6">
              <v-card flat tile class="d-flex">
                <v-card-text>
                  <h3>Initiative: {{ battleAttackerRobot.i }}</h3>
                  <h3>Attack: {{ battleAttackerRobot.a }}</h3>
                  <h3>Shield: {{ battleAttackerRobot.s }}</h3>
                </v-card-text>
              </v-card>
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

export default {
  name: "App",
  data() {
    return {
      robotDialog: false,
      robot: null,
      battleDialog: false,
      battleDefenderRobot: false,
      battleAttackerRobot: false
    };
  },
  computed: mapState({
    gameInProcess: state => state.game.inProcess,
    gameRobots: state => state.game.robots,
    defenderRobots: state => state.players.defenderRobots,
    attackerRobots: state => state.players.attackerRobots
  }),
  methods: {
    ...mapActions({
      gameStart: "game/start",
      playersStart: "players/start",
      gameDelRobot: "game/delRobot",
      defenderAddRobot: "players/addDefenderRobot",
      defenderDelRobot: "players/delDefenderRobot",
      attackerAddRobot: "players/addAttackerRobot",
      attackerDelRobot: "players/delAttackerRobot"
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
      this.battleDefenderRobot = false;
      this.battleAttackerRobot = false;
    },
    winAttacker: function() {
      this.defenderDelRobot(this.battleDefenderRobot.id);
      this.battleDialog = false;
      this.battleDefenderRobot = false;
      this.battleAttackerRobot = false;
    }
  }
};
</script>
