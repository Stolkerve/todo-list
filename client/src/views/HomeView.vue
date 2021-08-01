<template>
  <v-container>
    <CardComponent>
      <h1 class="text-center">
        Welcome!
      </h1>
    </CardComponent>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import CardComponent from "@/components/CardComponent.vue"
@Component({
  components: {
    CardComponent
  }
})
export default class HomeView extends Vue {

}

</script>
