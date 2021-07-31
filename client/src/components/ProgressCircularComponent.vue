<template>
  <div v-show="loading">
    <v-container class="text-center">
      <v-progress-circular
        :indeterminate="loading"
        color="primary"
      >
      </v-progress-circular>
    </v-container>
  </div>
</template>


<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
@Component
export default class ProgressCircularComponent extends Vue {
  @Prop({default:true}) loading!:boolean;
}
</script>