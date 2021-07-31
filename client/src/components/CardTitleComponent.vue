<template>
  <div class="pa-5 pb-5">
    <h2 class="text-center">{{title}}</h2>
  </div>    
</template>

<script lang="ts">
import {Vue, Prop, Component} from "vue-property-decorator"

@Component
export default class CardTitleComponent extends Vue {
  @Prop() title!: string;
}
</script>