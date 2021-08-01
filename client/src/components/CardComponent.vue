<template>
  <v-row>
    <v-col>
      <v-card :elevation="elevation">
        <slot>
        </slot>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Prop, Vue, Component} from "vue-property-decorator"
@Component
export default class CardComponent extends Vue {
  @Prop({default: 3}) elevation?: number;
}
</script>