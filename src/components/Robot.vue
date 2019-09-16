<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="d-flex child-flex" :cols="showPassword ? 6 : 12">
          <v-card flat tile class="d-flex">
            <v-img :src="`/images/robots/${robot.id}/${robot.id}.jpg`" :height="height" contain></v-img>
          </v-card>
        </v-col>
        <v-col v-if="showPassword" class="d-flex child-flex" cols="6">
          <v-card flat tile class="d-flex">
            <v-img :src="`/images/robots/${robot.id}/password.jpg`" :height="height" contain></v-img>
          </v-card>
        </v-col>
        <v-col class="d-flex child-flex" cols="4">
          <v-icon>mdi-speedometer</v-icon>
          <h3>{{ robot.i }}</h3>
        </v-col>
        <v-col class="d-flex child-flex" cols="4">
          <v-icon>mdi-flash</v-icon>
          <h3>{{ robot.a }}</h3>
        </v-col>
        <v-col class="d-flex child-flex" cols="4">
          <v-icon>mdi-shield</v-icon>
          <h3>{{ robot.s }}</h3>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Robot",
  props: {
    robot: {
      type: Object
    },
    height: {
      type: Number,
      default: 300
    },
    showPassword: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
    };
  }
};
</script>
